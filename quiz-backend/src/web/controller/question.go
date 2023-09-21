package controller

import (
	"encoding/json"
	"github.com/gofiber/fiber/v2"
	"q3/rnd/src/model/question"
	"strconv"
)

func CreateQuestionHandler(c *fiber.Ctx) error {
	var question question.Question
	if err := json.Unmarshal(c.Body(), &question); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	if err := question.CreateQuestion(db, &question); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.Status(fiber.StatusCreated).JSON(question)
}

func GetQuestionsForQuizHandler(c *fiber.Ctx) error {
	quizID, err := strconv.Atoi(c.Params("quiz_id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	questions, err := question.GetQuestionsForQuiz(db, quizID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.JSON(questions)
}

func UpdateQuestionHandler(c *fiber.Ctx) error {
	var question question.Question
	if err := json.Unmarshal(c.Body(), &question); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	if err := question.UpdateQuestion(db, &question); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.JSON(question)
}

func DeleteQuestionHandler(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	if err := question.DeleteQuestion(db, id); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.Status(fiber.StatusNoContent).SendString("")
}
