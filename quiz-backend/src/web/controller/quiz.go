package controller

import (
	"encoding/json"
	"github.com/gofiber/fiber/v2"
	"q3/rnd/src/model/quiz"
	"strconv"
)

func CreateQuizHandler(c *fiber.Ctx) error {
	var quiz quiz.Quiz
	if err := json.Unmarshal(c.Body(), &quiz); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	if err := quiz.CreateQuiz(db, &quiz); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.Status(fiber.StatusCreated).JSON(quiz)
}

func GetQuizByIDHandler(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	quiz, err := quiz.GetQuizByID(db, id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).SendString(err.Error())
	}

	return c.JSON(quiz)
}

func UpdateQuizHandler(c *fiber.Ctx) error {
	var quiz quiz.Quiz
	if err := json.Unmarshal(c.Body(), &quiz); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	if err := quiz.UpdateQuiz(db, &quiz); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.JSON(quiz)
}

func DeleteQuizHandler(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	if err := quiz.DeleteQuiz(db, id); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.Status(fiber.StatusNoContent).SendString("")
}
