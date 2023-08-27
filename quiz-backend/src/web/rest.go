package web

import (
	"github.com/gofiber/fiber/v2"
	"q3/rnd/src/web/controller"
)

// Create new REST API serveer
func Create() *fiber.App {
	app := fiber.New()

	app.Get("/", controller.Index)

	app.Get("/api/todos/:id", controller.TodoGet)
	app.Get("/api/todos", controller.TodoGetAll)
	app.Post("/api/todos", controller.TodoPost)
	app.Put("/api/todos", controller.TodoPut)
	app.Delete("/api/todos", controller.TodoDel)

	app.Get("/config", Config)

	return app
}
