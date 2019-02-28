package file

import (
	"io/ioutil"
	// "bufio"
	// "os"
)

func Reader(path string) (string) {
	bytes, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err)
	}
	return string(bytes)
}

// func BufReader() (string) {
// 	f, err := os.Open("static/index.html")
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer f.Close()

// 	reader := bufio.NewReader(f)
// 	buf    := make([]byte, 0)
// 	_, err = reader.Read(buf)
// 	if err != nil {
// 		panic(err)
// 	}
// 	return string(buf)
// }