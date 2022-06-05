package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql/schema"
	"github.com/kirbby/Menu_Selector/ent"
	"github.com/kirbby/Menu_Selector/ent/ogent"
	_ "github.com/mattn/go-sqlite3"
)

const (
	PORT = 8080
)

func main() {
	fmt.Print("Starting backend ...\n")

	// Create ent client.
	client, err := ent.Open(dialect.SQLite, "file:ent?mode=memory&cache=shared&_fk=1")
	if err != nil {
		log.Fatal(err)
	}
	// Run the migrations.
	if err := client.Schema.Create(context.Background(), schema.WithAtlas(true)); err != nil {
		log.Fatal(err)
	}
	// Start listening.
	srv, err := ogent.NewServer(ogent.NewOgentHandler(client))
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Listening on Port %d\n", PORT)
	if err := http.ListenAndServe(fmt.Sprintf(": %d", PORT), srv); err != nil {
		log.Fatal(err)
	}

}
