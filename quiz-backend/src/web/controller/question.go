package controller

import (
	"github.com/gofiber/fiber/v2"
	"q3/rnd/src/database"
	"q3/rnd/src/model/question"
)

func CreateQuestionHandler(c *fiber.Ctx) error {
	q := &question.Question{}
	if err := c.BodyParser(q); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	if err := question.CreateQuestion(database.DB, q); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(q)
}

func GetQuestionsForQuizHandler(c *fiber.Ctx) error {
	quizID := c.Params("quiz_id")
	questions, err := question.GetQuestionsForQuiz(database.DB, quizID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(questions)
}

func UpdateQuestionHandler(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	q := &question.Question{}
	if err := c.BodyParser(q); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	if q.ID != int64(id) {
		return c.Status(fiber.StatusBadRequest).JSON(err)
	}
	if err := question.UpdateQuestion(database.DB, q); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(q)
}

func DeleteQuestionHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := question.DeleteQuestion(database.DB, id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusNoContent).JSON(id)
}
