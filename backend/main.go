package main

import (
	"context"
	"log"
	"net/http"

	"github.com/kirbby/Menu_Selector/ent"
	"go.uber.org/zap"

	elk "github.com/kirbby/Menu_Selector/ent/http"
	_ "github.com/mattn/go-sqlite3"
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

	// Serve Frontend
	fs := http.FileServer(http.Dir("../frontend/dist"))

	http.Handle("/", fs)
	http.Handle("/api", elk.NewHandler(c, zap.NewExample()))

	log.Print("Listening on :3000...")
	derr := http.ListenAndServe(":3000", nil)
	// Start listen to incoming requests.
	//derr := http.ListenAndServe(":3000", elk.NewHandler(c, zap.NewExample()))
	if derr != nil {
		log.Fatal(err)
	}

	//if err != nil {
	//	log.Fatal(err)
	//}
}
