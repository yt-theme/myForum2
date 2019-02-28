package route
import (
	"myForum2/server/model"
	"net/http"
)

func route_static_init() {
	http.HandleFunc("/", model.MainPage_index_html)
	http.HandleFunc("/css/public.css", model.MainPage_public_css)
	http.HandleFunc("/js/index.js", model.MainPage_index_js)
	http.HandleFunc("/js/components.js", model.MainPage_components_js)
	http.HandleFunc("/js/router.js", model.MainPage_router_js)
}