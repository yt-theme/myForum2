package route

import (
	"net/http"
	"myForum2/server/model"
)

func route_api_init() {
	http.HandleFunc("/pool", model.HandlePool)
}
