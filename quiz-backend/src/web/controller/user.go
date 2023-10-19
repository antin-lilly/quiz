package controller

import (
	"q3/rnd/src/database"
	"q3/rnd/src/model/user"

	"github.com/gofiber/fiber/v2"
)

func CreateUserHandler(c *fiber.Ctx) error {
	u := &user.User{}
	if err := c.BodyParser(u); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	if err := user.CreateUser(database.DB, u); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(u)
}

func GetUserByIDHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	u := &user.User{}
	if err := user.GetUserByID(database.DB, u, id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(&[]user.User{*u})
}

func GetUsers(c *fiber.Ctx) error {
	t := &[]user.User{}
	if err := user.GetAll(database.DB, t); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(t)
}

func UpdateUserHandler(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	u := &user.User{}
	if err := c.BodyParser(u); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	if u.ID != int64(id) {
		return c.Status(fiber.StatusBadRequest).JSON(err)
	}
	if err := user.UpdateUser(database.DB, u); err != nil {
		return c.Status(fiber.StatusNotFound).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(u)
}

func DeleteUserHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := user.DeleteUser(database.DB, id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusNoContent).JSON(id)
}
