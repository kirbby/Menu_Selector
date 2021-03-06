// Code generated by ogen, DO NOT EDIT.

package ogent

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"math"
	"math/big"
	"math/bits"
	"net"
	"net/http"
	"net/url"
	"regexp"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/go-faster/errors"
	"github.com/go-faster/jx"
	"github.com/google/uuid"
	"github.com/ogen-go/ogen/conv"
	ht "github.com/ogen-go/ogen/http"
	"github.com/ogen-go/ogen/json"
	"github.com/ogen-go/ogen/otelogen"
	"github.com/ogen-go/ogen/uri"
	"github.com/ogen-go/ogen/validate"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/codes"
	"go.opentelemetry.io/otel/metric"
	"go.opentelemetry.io/otel/trace"
)

// No-op definition for keeping imports.
var (
	_ = context.Background()
	_ = fmt.Stringer(nil)
	_ = strings.Builder{}
	_ = errors.Is
	_ = sort.Ints
	_ = http.MethodGet
	_ = io.Copy
	_ = json.Marshal
	_ = bytes.NewReader
	_ = strconv.ParseInt
	_ = time.Time{}
	_ = conv.ToInt32
	_ = uuid.UUID{}
	_ = uri.PathEncoder{}
	_ = url.URL{}
	_ = math.Mod
	_ = bits.LeadingZeros64
	_ = big.Rat{}
	_ = validate.Int{}
	_ = ht.NewRequest
	_ = net.IP{}
	_ = otelogen.Version
	_ = attribute.KeyValue{}
	_ = trace.TraceIDFromHex
	_ = otel.GetTracerProvider
	_ = metric.NewNoopMeterProvider
	_ = regexp.MustCompile
	_ = jx.Null
	_ = sync.Pool{}
	_ = codes.Unset
)

// Handler handles operations described by OpenAPI v3 specification.
type Handler interface {
	// CreateGuest implements createGuest operation.
	//
	// Creates a new Guest and persists it to storage.
	//
	// POST /guests
	CreateGuest(ctx context.Context, req CreateGuestReq) (CreateGuestRes, error)
	// CreateMenuItem implements createMenuItem operation.
	//
	// Creates a new MenuItem and persists it to storage.
	//
	// POST /menu-items
	CreateMenuItem(ctx context.Context, req CreateMenuItemReq) (CreateMenuItemRes, error)
	// DeleteGuest implements deleteGuest operation.
	//
	// Deletes the Guest with the requested ID.
	//
	// DELETE /guests/{id}
	DeleteGuest(ctx context.Context, params DeleteGuestParams) (DeleteGuestRes, error)
	// DeleteMenuItem implements deleteMenuItem operation.
	//
	// Deletes the MenuItem with the requested ID.
	//
	// DELETE /menu-items/{id}
	DeleteMenuItem(ctx context.Context, params DeleteMenuItemParams) (DeleteMenuItemRes, error)
	// ListGuest implements listGuest operation.
	//
	// List Guests.
	//
	// GET /guests
	ListGuest(ctx context.Context, params ListGuestParams) (ListGuestRes, error)
	// ListMenuItem implements listMenuItem operation.
	//
	// List MenuItems.
	//
	// GET /menu-items
	ListMenuItem(ctx context.Context, params ListMenuItemParams) (ListMenuItemRes, error)
	// ReadGuest implements readGuest operation.
	//
	// Finds the Guest with the requested ID and returns it.
	//
	// GET /guests/{id}
	ReadGuest(ctx context.Context, params ReadGuestParams) (ReadGuestRes, error)
	// ReadMenuItem implements readMenuItem operation.
	//
	// Finds the MenuItem with the requested ID and returns it.
	//
	// GET /menu-items/{id}
	ReadMenuItem(ctx context.Context, params ReadMenuItemParams) (ReadMenuItemRes, error)
	// UpdateGuest implements updateGuest operation.
	//
	// Updates a Guest and persists changes to storage.
	//
	// PATCH /guests/{id}
	UpdateGuest(ctx context.Context, req UpdateGuestReq, params UpdateGuestParams) (UpdateGuestRes, error)
	// UpdateMenuItem implements updateMenuItem operation.
	//
	// Updates a MenuItem and persists changes to storage.
	//
	// PATCH /menu-items/{id}
	UpdateMenuItem(ctx context.Context, req UpdateMenuItemReq, params UpdateMenuItemParams) (UpdateMenuItemRes, error)
}

// Server implements http server based on OpenAPI v3 specification and
// calls Handler to handle requests.
type Server struct {
	h   Handler
	cfg config

	requests metric.Int64Counter
	errors   metric.Int64Counter
	duration metric.Int64Histogram
}

func NewServer(h Handler, opts ...Option) (*Server, error) {
	s := &Server{
		h:   h,
		cfg: newConfig(opts...),
	}
	var err error
	if s.requests, err = s.cfg.Meter.NewInt64Counter(otelogen.ServerRequestCount); err != nil {
		return nil, err
	}
	if s.errors, err = s.cfg.Meter.NewInt64Counter(otelogen.ServerErrorsCount); err != nil {
		return nil, err
	}
	if s.duration, err = s.cfg.Meter.NewInt64Histogram(otelogen.ServerDuration); err != nil {
		return nil, err
	}
	return s, nil
}
