package main

import (
	"context"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
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
	http.Handle("/", http.FileServer(http.Dir("../frontend/dist")))
	// Server Frontend on different path
	//http.Handle("/selector/", http.StripPrefix("/selector/", http.FileServer(http.Dir("../frontend/dist"))))

	r := chi.NewRouter()
	elk.MountRoutes(c, zap.NewExample(), r)

	r2 := chi.NewRouter()
	r2.Mount("/api", r)

	//http.Handle("/api", elk.NewHandler(c, zap.NewExample()))

	log.Print("Listening on :3000...")
	derr := http.ListenAndServe(":3000", r2)
	// Start listen to incoming requests.
	//derr := http.ListenAndServe(":3000", elk.NewHandler(c, zap.NewExample()))
	if derr != nil {
		log.Fatal(err)
	}

	//if err != nil {
	//	log.Fatal(err)
	//}
}
