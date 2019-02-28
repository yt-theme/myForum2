package model

import (
	"fmt"
	"myForum2/server/db"
	"net/http"
)

func HandlePool(w http.ResponseWriter, r *http.Request) {
	sql1 := "select ?,?,? from users"
	ret := db.DbQuery(sql1)
	fmt.Println("ret", ret[0]["id"])
}