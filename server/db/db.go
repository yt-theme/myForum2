package db

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

var  (
	db *sql.DB
	err error
)

func init() {
	db, err = sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/forum?charset=utf8")
	if err != nil { panic(err) }
	// 最大打开的连接数
	db.SetMaxOpenConns(2000)
	// 闲置连接数
	db.SetMaxIdleConns(1000)
}