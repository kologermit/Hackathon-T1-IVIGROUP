FROM golang:1.22

WORKDIR /app
COPY ./go.mod .
RUN apt update && \
go get github.com/gin-gonic/gin && \
go get github.com/go-sql-driver/mysql && \
go get github.com/google/uuid

CMD go run main.go