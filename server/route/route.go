package route

import (
	"fmt"
	"net/http"
)

func init() {

	crt_path := "static/server.crt"
	key_path := "static/server.key"

	// static
	route_static_init()

	// api
	route_api_init()

	err := http.ListenAndServeTLS("0.0.0.0:6970", crt_path, key_path, nil)
	if err != nil {
		fmt.Println("http server faild")
		return
	}
}