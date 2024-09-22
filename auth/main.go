package main

import (
	"fmt"
	"os"
	"sync"
	"time"

	"database/sql"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/google/uuid"
)

type Answer struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}

type Token struct {
	token  string
	expire int64
}

const expire_time = 10 * 60 // 10 minutes

func main() {
	r := gin.Default()
	db, err := sql.Open("mysql",
		fmt.Sprintf("%s:%s@tcp(db:3306)/%s",
			os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_DB")))
	if err != nil {
		fmt.Println("Failed to connect")
		return
	}
	all_tokens := map[string]Token{}
	var all_tokens_mutex sync.Mutex

	r.GET("sign-in/", func(c *gin.Context) {
		var ans = Answer{Status: 400, Message: "success"}
		user_param, ok := c.GetQuery("user")
		if !ok {
			ans.Message = "param user not found"
			c.JSON(ans.Status, ans)
			return
		}
		hash, ok := c.GetQuery("hash")
		if !ok {
			ans.Message = "param hash not found"
			c.JSON(ans.Status, ans)
			return
		}
		rows, err := db.Query("SELECT hash FROM users WHERE id=?", user_param)
		if err != nil {
			fmt.Println("Server error1: ", err)
			ans.Status = 500
			ans.Message = "server error"
			c.JSON(ans.Status, ans)
			return
		}
		defer rows.Close()
		var db_hash string
		for rows.Next() {
			err := rows.Scan(&db_hash)
			if err != nil {
				fmt.Println("Server error2: ", err)
				ans.Status = 500
				ans.Message = "server error"
				c.JSON(ans.Status, ans)
				return
			}
			if db_hash == hash {
				ans.Status = 200
				ans.Message = "success"
				uuid := uuid.NewString()
				all_tokens[user_param] = Token{token: uuid, expire: time.Now().Unix() + expire_time}
				ans.Data = map[string]string{"token": uuid}
				c.JSON(ans.Status, ans)
				return
			}
		}
		ans.Status = 400
		ans.Message = "user not found"
		c.JSON(ans.Status, ans)
	})

	r.GET("auth/", func(c *gin.Context) {
		var ans = Answer{Status: 400, Message: "success"}
		user_param, ok := c.GetQuery("user")
		if !ok {
			ans.Message = "param user not found"
			c.JSON(ans.Status, ans)
			return
		}
		token_param, ok := c.GetQuery("token")
		if !ok {
			ans.Message = "param token not found"
			c.JSON(ans.Status, ans)
			return
		}
		all_tokens_mutex.Lock()
		defer all_tokens_mutex.Unlock()
		token, ok := all_tokens[user_param]
		if !ok || token.token != token_param {
			ans.Message = "token not found"
			c.JSON(ans.Status, ans)
			return
		}
		if token.expire < time.Now().Unix() {
			ans.Message = "token is expired"
			delete(all_tokens, user_param)
			c.JSON(ans.Status, ans)
			return
		}
		ans.Status = 200
		new_token := all_tokens[user_param]
		new_token.expire = time.Now().Unix() + expire_time
		all_tokens[user_param] = new_token
		c.JSON(ans.Status, ans)
	})

	r.GET("log-out/", func(c *gin.Context) {
		var ans = Answer{Status: 400, Message: "success"}
		user_param, ok := c.GetQuery("user")
		if !ok {
			ans.Message = "param user not found"
			c.JSON(ans.Status, ans)
			return
		}
		token_param, ok := c.GetQuery("token")
		if !ok {
			ans.Message = "param token not found"
			c.JSON(ans.Status, ans)
			return
		}
		all_tokens_mutex.Lock()
		defer all_tokens_mutex.Unlock()
		token, ok := all_tokens[user_param]
		if !ok || token.token != token_param {
			ans.Message = "token not found"
			c.JSON(ans.Status, ans)
			return
		}
		delete(all_tokens, user_param)
		ans.Status = 200
		ans.Message = "success"
		c.JSON(ans.Status, ans)
	})
	r.Run()
}
