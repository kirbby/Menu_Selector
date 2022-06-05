// Code generated by entc, DO NOT EDIT.

package ogent

import "github.com/kirbby/Menu_Selector/ent"

func NewGuestCreate(e *ent.Guest) *GuestCreate {
	if e == nil {
		return nil
	}
	var ret GuestCreate
	ret.ID = e.ID
	ret.Name = e.Name
	ret.Email = e.Email
	return &ret
}

func NewGuestCreates(es []*ent.Guest) []GuestCreate {
	if len(es) == 0 {
		return nil
	}
	r := make([]GuestCreate, len(es))
	for i, e := range es {
		r[i] = NewGuestCreate(e).Elem()
	}
	return r
}

func (gu *GuestCreate) Elem() GuestCreate {
	if gu == nil {
		return GuestCreate{}
	}
	return *gu
}

func NewGuestList(e *ent.Guest) *GuestList {
	if e == nil {
		return nil
	}
	var ret GuestList
	ret.ID = e.ID
	ret.Name = e.Name
	ret.Email = e.Email
	return &ret
}

func NewGuestLists(es []*ent.Guest) []GuestList {
	if len(es) == 0 {
		return nil
	}
	r := make([]GuestList, len(es))
	for i, e := range es {
		r[i] = NewGuestList(e).Elem()
	}
	return r
}

func (gu *GuestList) Elem() GuestList {
	if gu == nil {
		return GuestList{}
	}
	return *gu
}

func NewGuestRead(e *ent.Guest) *GuestRead {
	if e == nil {
		return nil
	}
	var ret GuestRead
	ret.ID = e.ID
	ret.Name = e.Name
	ret.Email = e.Email
	return &ret
}

func NewGuestReads(es []*ent.Guest) []GuestRead {
	if len(es) == 0 {
		return nil
	}
	r := make([]GuestRead, len(es))
	for i, e := range es {
		r[i] = NewGuestRead(e).Elem()
	}
	return r
}

func (gu *GuestRead) Elem() GuestRead {
	if gu == nil {
		return GuestRead{}
	}
	return *gu
}

func NewGuestUpdate(e *ent.Guest) *GuestUpdate {
	if e == nil {
		return nil
	}
	var ret GuestUpdate
	ret.ID = e.ID
	ret.Name = e.Name
	ret.Email = e.Email
	return &ret
}

func NewGuestUpdates(es []*ent.Guest) []GuestUpdate {
	if len(es) == 0 {
		return nil
	}
	r := make([]GuestUpdate, len(es))
	for i, e := range es {
		r[i] = NewGuestUpdate(e).Elem()
	}
	return r
}

func (gu *GuestUpdate) Elem() GuestUpdate {
	if gu == nil {
		return GuestUpdate{}
	}
	return *gu
}

func NewMenuItemCreate(e *ent.MenuItem) *MenuItemCreate {
	if e == nil {
		return nil
	}
	var ret MenuItemCreate
	ret.ID = e.ID
	ret.Name = e.Name
	ret.Description = e.Description
	ret.Image = e.Image
	ret.CategoryId = e.CategoryId
	return &ret
}

func NewMenuItemCreates(es []*ent.MenuItem) []MenuItemCreate {
	if len(es) == 0 {
		return nil
	}
	r := make([]MenuItemCreate, len(es))
	for i, e := range es {
		r[i] = NewMenuItemCreate(e).Elem()
	}
	return r
}

func (mi *MenuItemCreate) Elem() MenuItemCreate {
	if mi == nil {
		return MenuItemCreate{}
	}
	return *mi
}

func NewMenuItemList(e *ent.MenuItem) *MenuItemList {
	if e == nil {
		return nil
	}
	var ret MenuItemList
	ret.ID = e.ID
	ret.Name = e.Name
	ret.Description = e.Description
	ret.Image = e.Image
	ret.CategoryId = e.CategoryId
	return &ret
}

func NewMenuItemLists(es []*ent.MenuItem) []MenuItemList {
	if len(es) == 0 {
		return nil
	}
	r := make([]MenuItemList, len(es))
	for i, e := range es {
		r[i] = NewMenuItemList(e).Elem()
	}
	return r
}

func (mi *MenuItemList) Elem() MenuItemList {
	if mi == nil {
		return MenuItemList{}
	}
	return *mi
}

func NewMenuItemRead(e *ent.MenuItem) *MenuItemRead {
	if e == nil {
		return nil
	}
	var ret MenuItemRead
	ret.ID = e.ID
	ret.Name = e.Name
	ret.Description = e.Description
	ret.Image = e.Image
	ret.CategoryId = e.CategoryId
	return &ret
}

func NewMenuItemReads(es []*ent.MenuItem) []MenuItemRead {
	if len(es) == 0 {
		return nil
	}
	r := make([]MenuItemRead, len(es))
	for i, e := range es {
		r[i] = NewMenuItemRead(e).Elem()
	}
	return r
}

func (mi *MenuItemRead) Elem() MenuItemRead {
	if mi == nil {
		return MenuItemRead{}
	}
	return *mi
}

func NewMenuItemUpdate(e *ent.MenuItem) *MenuItemUpdate {
	if e == nil {
		return nil
	}
	var ret MenuItemUpdate
	ret.ID = e.ID
	ret.Name = e.Name
	ret.Description = e.Description
	ret.Image = e.Image
	ret.CategoryId = e.CategoryId
	return &ret
}

func NewMenuItemUpdates(es []*ent.MenuItem) []MenuItemUpdate {
	if len(es) == 0 {
		return nil
	}
	r := make([]MenuItemUpdate, len(es))
	for i, e := range es {
		r[i] = NewMenuItemUpdate(e).Elem()
	}
	return r
}

func (mi *MenuItemUpdate) Elem() MenuItemUpdate {
	if mi == nil {
		return MenuItemUpdate{}
	}
	return *mi
}