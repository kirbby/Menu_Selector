// Code generated by entc, DO NOT EDIT.

package ent

import (
	"fmt"
	"strings"

	"entgo.io/ent/dialect/sql"
	"github.com/kirbby/Menu_Selector/ent/menuitem"
)

// MenuItem is the model entity for the MenuItem schema.
type MenuItem struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Description holds the value of the "description" field.
	Description string `json:"description,omitempty"`
	// Image holds the value of the "image" field.
	Image string `json:"image,omitempty"`
	// CategoryId holds the value of the "categoryId" field.
	CategoryId int `json:"categoryId,omitempty"`
}

// scanValues returns the types for scanning values from sql.Rows.
func (*MenuItem) scanValues(columns []string) ([]interface{}, error) {
	values := make([]interface{}, len(columns))
	for i := range columns {
		switch columns[i] {
		case menuitem.FieldID, menuitem.FieldCategoryId:
			values[i] = new(sql.NullInt64)
		case menuitem.FieldName, menuitem.FieldDescription, menuitem.FieldImage:
			values[i] = new(sql.NullString)
		default:
			return nil, fmt.Errorf("unexpected column %q for type MenuItem", columns[i])
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the MenuItem fields.
func (mi *MenuItem) assignValues(columns []string, values []interface{}) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case menuitem.FieldID:
			value, ok := values[i].(*sql.NullInt64)
			if !ok {
				return fmt.Errorf("unexpected type %T for field id", value)
			}
			mi.ID = int(value.Int64)
		case menuitem.FieldName:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field name", values[i])
			} else if value.Valid {
				mi.Name = value.String
			}
		case menuitem.FieldDescription:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field description", values[i])
			} else if value.Valid {
				mi.Description = value.String
			}
		case menuitem.FieldImage:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field image", values[i])
			} else if value.Valid {
				mi.Image = value.String
			}
		case menuitem.FieldCategoryId:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field categoryId", values[i])
			} else if value.Valid {
				mi.CategoryId = int(value.Int64)
			}
		}
	}
	return nil
}

// Update returns a builder for updating this MenuItem.
// Note that you need to call MenuItem.Unwrap() before calling this method if this MenuItem
// was returned from a transaction, and the transaction was committed or rolled back.
func (mi *MenuItem) Update() *MenuItemUpdateOne {
	return (&MenuItemClient{config: mi.config}).UpdateOne(mi)
}

// Unwrap unwraps the MenuItem entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (mi *MenuItem) Unwrap() *MenuItem {
	tx, ok := mi.config.driver.(*txDriver)
	if !ok {
		panic("ent: MenuItem is not a transactional entity")
	}
	mi.config.driver = tx.drv
	return mi
}

// String implements the fmt.Stringer.
func (mi *MenuItem) String() string {
	var builder strings.Builder
	builder.WriteString("MenuItem(")
	builder.WriteString(fmt.Sprintf("id=%v", mi.ID))
	builder.WriteString(", name=")
	builder.WriteString(mi.Name)
	builder.WriteString(", description=")
	builder.WriteString(mi.Description)
	builder.WriteString(", image=")
	builder.WriteString(mi.Image)
	builder.WriteString(", categoryId=")
	builder.WriteString(fmt.Sprintf("%v", mi.CategoryId))
	builder.WriteByte(')')
	return builder.String()
}

// MenuItems is a parsable slice of MenuItem.
type MenuItems []*MenuItem

func (mi MenuItems) config(cfg config) {
	for _i := range mi {
		mi[_i].config = cfg
	}
}
