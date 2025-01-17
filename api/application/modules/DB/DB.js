const mysql = require('mysql2');

class DB {
    constructor() {
        while (true) {
        try {
            this.connection = mysql.createConnection({
                host: "db",
                user: "admin",
                database: "hackathon",
                password: "qwerty",
                port: 3306
            }); 
            break;
          } catch (error) {
                const sleep = (ms) => {
                    const start = new Date().getTime();
                    while (new Date().getTime() < start + ms);
                };
                
                sleep(1000);    
            }
        }
    }

    async queryHandler(query, data, isAll) {
        const promise = new Promise((resolve, reject) => {
            this.connection.query(query, data, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        })
        let result = await promise;
        if(isAll) {
            return result;
        }
        return result[0];
    }

    async getVoteConfig(voteId) {
        let query = "SELECT users.config\
            FROM votes INNER JOIN users ON votes.admin_id=users.id WHERE votes.id=?"
        return await this.queryHandler(query, [voteId], false)
    }

    async setConfig(name, config) {
        let query = "UPDATE users SET config=? WHERE name=?"
        return await this.queryHandler(query, [JSON.stringify(config), name], false)
    }

    async checkUserByName(name) {
        let query = "SELECT id, name, hash, admin FROM users WHERE name = ?";
        return await this.queryHandler(query, [name], true);
    }

    async getUserByName(name) {
        let query = "SELECT id, name, hash, admin FROM users WHERE name = ?";
        let user = await this.queryHandler(query, [name]);
        console.log("name")
        console.log(name)
        console.log("user")
        console.log(user)
        if (user === undefined) {
            return {
                id: -1
            }
        }
        return user;
    }

    async getUserById(name) {
        let query = "SELECT id, name, hash, admin FROM users WHERE id = ?";
        return await this.queryHandler(query, [name], true);
    }

    async addAdmin(name, hash) {
        let query = "INSERT INTO users (name, hash, admin) VALUES (?,?,1);";
        return await this.queryHandler(query, [name, hash]);
    }

    async addUser(name, hash) {
        let query = "INSERT INTO users (name, hash, admin) VALUES (?,?,0)";
        return await this.queryHandler(query, [name, hash]);
    }

    async addVote(desc, admin_id) {
        let query = "INSERT INTO votes (description, admin_id) VALUES (?,?)";
        const result = await this.queryHandler(query, [desc, admin_id], true);
        if (result === undefined) {
            return -1;
        }
        return result.insertId
    }

    async addServiceQuestion(desc, voteId, q1, q2, q3) {
        let query = "INSERT INTO votes_questions (description, vote_id, q1,q2,q3) VALUES (?,?,?,?,?)";
        return await this.queryHandler(query, [desc, voteId, q1, q2, q3]);
    }

    async getVoteById(id) {
        let query = "SELECT description, admin_id FROM votes WHERE id=?";
        if (vote === undefined) {
            return {
                description: ""
            }
        }
        return await this.queryHandler(query, [id]);
    }

    async getVoteQuestionByVoteId(id) {
        let query = "SELECT description, q1,q2,q3 FROM votes_questions WHERE vote_id=?";
        return await this.queryHandler(query, [id], true);
    }
    
    async getQuestionsIdByVoteId(id) {
        let query = "SELECT id FROM votes_questions WHERE vote_id=?";
        return await this.queryHandler(query, [id], true);
    }

    async insertUserResponceOnQuestions(voteId, voteQuestionId, q1, q2, q3, userId) {
        const query = "INSERT INTO responce (vote_id, vote_question_id, q1,q2,q3, user_id) VALUES (?,?,?,?,?,?)";
        await this.queryHandler(query, [voteId, voteQuestionId, q1, q2, q3, userId]);
    }
 
    async getAdminVotes(id) {
        let query = "SELECT id, description FROM votes WHERE admin_id=?";
        return await this.queryHandler(query, [id], true);
    }
    async getResponceByUserAndVoteId(voteId, userId) {
        let query = "SELECT q1,q2,q3 FROM responce WHERE vote_id=?";
        return await this.queryHandler(query, [voteId, userId], true);
    }

    async findUsersByQuestions(voteId, userId) {
        let query = "SELECT DISTINCT user_id FROM responce WHERE vote_id = ?";
        return await this.queryHandler(query, [voteId], true);
    }
}
module.exports = DB;
