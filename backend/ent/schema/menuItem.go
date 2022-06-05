package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// MenuItem holds the schema definition for the MenuItem entity.
type MenuItem struct {
	ent.Schema
}

// Fields of the MenuItem.
func (MenuItem) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			Default("unknown"),
		field.String("description").
			Default("unknown"),
		field.String("image").
			Default("unknown"),
		field.Int("categoryId").
			Default(0),
	}
}

// Edges of the MenuItem.
func (MenuItem) Edges() []ent.Edge {
	return nil
}