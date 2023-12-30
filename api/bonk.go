package handler

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/pusher/pusher-http-go/v5"
)


type Payload struct {
    Url string `json:"url" `
}

func Handler(w http.ResponseWriter, r *http.Request) {
	if (r.Method == "POST") {
		reqBody, _ := ioutil.ReadAll(r.Body)
		var data Payload 
		json.Unmarshal(reqBody, &data)

		pusherClient := pusher.Client{
			AppID: "1577349",
			Key: "1971fe9418e861720cec",
			Secret: "492ad61909e86fef685c",
			Cluster: "eu",
			Secure: true,
		}

		fmt.Println(data, "golang")
		
		err := pusherClient.Trigger("my-channel", "my-event", data)
		if err != nil {
			fmt.Println(err.Error())
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(500)
			return;
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(200)
		return;
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(409)
	}
}
