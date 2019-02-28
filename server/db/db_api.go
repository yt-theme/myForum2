package db

import (
	_ "fmt"
)
func DbQuery(sql string) ([]map[string]interface{}) {
	var id, name, passwd string
	stm, _ 	   := db.Prepare(sql)
	stm.Exec("id", "name", "passwd")
	rows, _    := stm.Query()
	columns, _ := rows.Columns()
	size 	   := len(columns)

	// 切片存储返回值
	storeArr := make([]map[string]interface{}, 0)
	// 切片每项 key value
	columnsItem := make(map[string]interface{}, size)

	for rows.Next() {
		if err := rows.Scan(&id, &name, &passwd); err != nil { panic(err) }
		// item["id"] = id
		// item["name"] = name
		// item["passwd"] = passwd
		storeArr = append(storeArr, columnsItem)
		// fmt.Println("item", item)
	}
	
	defer stm.Close()
	defer rows.Close()
	return storeArr
}