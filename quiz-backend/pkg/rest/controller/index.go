package controller

import (
	"github.com/gofiber/fiber/v2"
	"time"
)

// Index GET /
func Index(c *fiber.Ctx) error {
	return c.JSON(struct {
		Message   string `json:""`
		Timestamp int64
	}{
		Message:   "Hello go lang fiber!",
		Timestamp: time.Now().UTC().UnixMilli(),
	})
}
