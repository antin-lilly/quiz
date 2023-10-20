package controller

import (
	"q3/rnd/src/database"
	"q3/rnd/src/model/user"
	auth_service "q3/rnd/src/service/auth-service"

	"github.com/gofiber/fiber/v2"

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

	// Retrieve the user from the database by username
	storedUser := &user.User{}
	if err := user.GetUserByUsername(database.DB, storedUser, loginData.Username); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Invalid username or password",
		})
	}

	// Compare the provided password with the stored hash
	err := bcrypt.CompareHashAndPassword([]byte(storedUser.Password), []byte(loginData.Password))
	if err != nil {
		// Passwords do not match
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Invalid username or password",
		})
	}

	// Passwords match, generate token and respond
	token, err := auth_service.GenerateToken(storedUser.ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"token": token})
}
