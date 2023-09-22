package controller

import (
	"github.com/gofiber/fiber/v2"
	"q3/rnd/src/database"
	"q3/rnd/src/model/quiz"
)

func CreateQuizHandler(c *fiber.Ctx) error {
	q := &quiz.Quiz{}
	if err := c.BodyParser(q); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	if err := quiz.CreateQuiz(database.DB, q); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(q)
}

func GetQuizByIDHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	q := &quiz.Quiz{}
	if err := quiz.GetQuizByID(database.DB, q, id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(&[]quiz.Quiz{*q})
}

func UpdateQuizHandler(c *fiber.Ctx) error {
	q := &quiz.Quiz{}
	if err := c.BodyParser(q); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	if err := quiz.UpdateQuiz(database.DB, q); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(q)
}

func DeleteQuizHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := quiz.DeleteQuiz(database.DB, id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusNoContent).JSON(id)
}
