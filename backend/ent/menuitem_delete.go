// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/kirbby/Menu_Selector/ent/menuitem"
	"github.com/kirbby/Menu_Selector/ent/predicate"
)

// MenuItemDelete is the builder for deleting a MenuItem entity.
type MenuItemDelete struct {
	config
	hooks    []Hook
	mutation *MenuItemMutation
}

// Where appends a list predicates to the MenuItemDelete builder.
func (mid *MenuItemDelete) Where(ps ...predicate.MenuItem) *MenuItemDelete {
	mid.mutation.Where(ps...)
	return mid
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (mid *MenuItemDelete) Exec(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(mid.hooks) == 0 {
		affected, err = mid.sqlExec(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*MenuItemMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			mid.mutation = mutation
			affected, err = mid.sqlExec(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(mid.hooks) - 1; i >= 0; i-- {
			if mid.hooks[i] == nil {
				return 0, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = mid.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, mid.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// ExecX is like Exec, but panics if an error occurs.
func (mid *MenuItemDelete) ExecX(ctx context.Context) int {
	n, err := mid.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (mid *MenuItemDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := &sqlgraph.DeleteSpec{
		Node: &sqlgraph.NodeSpec{
			Table: menuitem.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: menuitem.FieldID,
			},
		},
	}
	if ps := mid.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return sqlgraph.DeleteNodes(ctx, mid.driver, _spec)
}

// MenuItemDeleteOne is the builder for deleting a single MenuItem entity.
type MenuItemDeleteOne struct {
	mid *MenuItemDelete
}

// Exec executes the deletion query.
func (mido *MenuItemDeleteOne) Exec(ctx context.Context) error {
	n, err := mido.mid.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{menuitem.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (mido *MenuItemDeleteOne) ExecX(ctx context.Context) {
	mido.mid.ExecX(ctx)
}
