package controller

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	"q3/rnd/src/database"
	"q3/rnd/src/model/option"
	"q3/rnd/src/model/question"
)

var db *gorm.DB

func CreateOptionHandler(c *fiber.Ctx) error {
	o := &option.Option{}
	if err := c.BodyParser(o); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	if err := option.CreateOption(database.DB, o); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(o)
}

func GetOptionsForQuestionHandler(c *fiber.Ctx) error {
	questionID := c.Params("question_id")
	questions, err := question.GetQuestionsForQuiz(database.DB, questionID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(questions)
}

func UpdateOptionHandler(c *fiber.Ctx) error {
	o := &option.Option{}
	if err := c.BodyParser(o); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	if err := option.UpdateOption(database.DB, o); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(o)
}

func DeleteOptionHandler(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := option.DeleteOption(database.DB, id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusNoContent).JSON(id)
}
