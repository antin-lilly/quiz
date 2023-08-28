package controller

import (
	"github.com/gofiber/fiber/v2"
	"q3/rnd/src/database"
	"q3/rnd/src/model/todo"
)

// TodoGet GET /api/todos
func TodoGet(c *fiber.Ctx) error {
	id := c.Params("id")
	t := &todo.TODO{}
	if err := todo.Read(database.DB, t, id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(&[]todo.TODO{*t})
}

func TodoGetAll(c *fiber.Ctx) error {
	t := &[]todo.TODO{}
	if err := todo.ReadAll(database.DB, t); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(t)
}

// TodoPost POST /api/todos
func TodoPost(c *fiber.Ctx) error {
	t := &todo.TODO{}
	if err := c.BodyParser(t); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	if err := todo.Create(database.DB, t); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(t)
}

// TodoPut PUT /api/todos
func TodoPut(c *fiber.Ctx) error {
	t := &todo.TODO{}
	if err := c.BodyParser(t); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	if err := todo.Update(database.DB, t); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(t)
}

// TodoDel DELETE /api/todos/:id
func TodoDel(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := todo.DeleteByID(database.DB, id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusNoContent).JSON(id)
}
