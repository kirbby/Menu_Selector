package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// Guest holds the schema definition for the Guest entity.
type Guest struct {
	ent.Schema
}

// Fields of the Guest.
func (Guest) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
		field.String("email"),
	}
}

// Edges of the Guest.
func (Guest) Edges() []ent.Edge {
	return nil
}
