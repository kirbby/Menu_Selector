package main

import (
	"context"
	"log"
	"net/http"

	"github.com/kirbby/Menu_Selector/ent"
	elk "github.com/kirbby/Menu_Selector/ent/http"

	_ "github.com/mattn/go-sqlite3"
	"go.uber.org/zap"
)

func main() {

	// Create the ent client. This opens up a sqlite file named elk.db.
	c, err := ent.Open("sqlite3", "./elk.db?_fk=1")
	if err != nil {
		log.Fatalf("failed opening connection to sqlite: %v", err)
	}
	defer c.Close()
	// Run the auto migration tool.
	if err := c.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}
	// Start listen to incoming requests.
	if err := http.ListenAndServe(":3000", elk.NewHandler(c, zap.NewExample())); err != nil {
		log.Fatal(err)
	}

	//fs := http.FileServer(http.Dir("../frontend/dist"))
	//http.Handle("/", fs)

	//log.Print("Listening on :3000...")
	//err := http.ListenAndServe(":3000", nil)
	//if err != nil {
	//	log.Fatal(err)
	//}
}
