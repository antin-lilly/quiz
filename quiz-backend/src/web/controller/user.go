package controller

import (
	"q3/rnd/src/database"
	"q3/rnd/src/model/user"
	auth_service "q3/rnd/src/service/auth-service"

	"github.com/gofiber/fiber/v2"

	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func CreateUserHandler(c *fiber.Ctx) error {
	u := &user.User{}
	if err := c.BodyParser(u); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	u.Admin = false

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	u.Password = string(hashedPassword)

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

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	u.Password = string(hashedPassword)

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

func AuthenticateUserHandler(c *fiber.Ctx) error {
	loginData := struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}{}
	if err := c.BodyParser(&loginData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err)
	}

	storedUser := &user.User{}
	if err := user.GetUserByUsername(database.DB, storedUser, loginData.Username); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Invalid username or password",
		})
	}

	err := bcrypt.CompareHashAndPassword([]byte(storedUser.Password), []byte(loginData.Password))
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Invalid username or password",
		})
	}

	token, err := auth_service.GenerateToken(storedUser.ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"token": token, "admin": storedUser.Admin})
}

func CurrentUserHandler(c *fiber.Ctx) error {
	userID, ok := c.Locals("user_id").(int64)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}

	u := &user.User{}
	if err := user.GetUserByID(database.DB, u, fmt.Sprintf("%d", userID)); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.JSON(u)
}
