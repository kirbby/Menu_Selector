// Code generated by entc, DO NOT EDIT.

package http

import (
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/kirbby/Menu_Selector/ent"
	"github.com/kirbby/Menu_Selector/ent/guest"
	"github.com/mailru/easyjson"
	"go.uber.org/zap"
)

// Read fetches the ent.Guest identified by a given url-parameter from the
// database and renders it to the client.
func (h *GuestHandler) Read(w http.ResponseWriter, r *http.Request) {
	l := h.log.With(zap.String("method", "Read"))
	// ID is URL parameter.
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		l.Error("error getting id from url parameter", zap.String("id", chi.URLParam(r, "id")), zap.Error(err))
		BadRequest(w, "id must be an integer")
		return
	}
	// Create the query to fetch the Guest
	q := h.client.Guest.Query().Where(guest.ID(id))
	e, err := q.Only(r.Context())
	if err != nil {
		switch {
		case ent.IsNotFound(err):
			msg := stripEntError(err)
			l.Info(msg, zap.Error(err), zap.Int("id", id))
			NotFound(w, msg)
		case ent.IsNotSingular(err):
			msg := stripEntError(err)
			l.Error(msg, zap.Error(err), zap.Int("id", id))
			BadRequest(w, msg)
		default:
			l.Error("could not read guest", zap.Error(err), zap.Int("id", id))
			InternalServerError(w, nil)
		}
		return
	}
	l.Info("guest rendered", zap.Int("id", id))
	easyjson.MarshalToHTTPResponseWriter(NewGuest3946703519View(e), w)
}