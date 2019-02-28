package model

import (
	"myForum2/utils/file"
	"io"
	"net/http"
)

const (
	index_html_path    = "static/index.html"
	public_css_path	   = "static/css/public.css"
	index_js_path 	   = "static/js/index.js"
	components_js_path = "static/js/components.js"
	router_js_path	   = "static/js/router.js"
)

func MainPage_index_html(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "text/html")
	index_html := file.Reader(index_html_path)
	io.WriteString(w, index_html)
}

func MainPage_public_css(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "text/css")
	index_html := file.Reader(public_css_path)
	io.WriteString(w, index_html)
}

func MainPage_index_js(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/x-javascript")
	index_html := file.Reader(index_js_path)
	io.WriteString(w, index_html)
}

func MainPage_components_js(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/x-javascript")
	index_html := file.Reader(components_js_path)
	io.WriteString(w, index_html)
}

func MainPage_router_js(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/x-javascript")
	index_html := file.Reader(router_js_path)
	io.WriteString(w, index_html)
}