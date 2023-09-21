package controller

import (
	"encoding/json"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	"q3/rnd/src/model/option"
	"strconv"
)

var db *gorm.DB

func CreateOptionHandler(c *fiber.Ctx) error {
	var opt option.Option
	if err := json.Unmarshal(c.Body(), &opt); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	if err := option.CreateOption(db, &opt); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	c.Status(fiber.StatusCreated)
	return c.JSON(opt)
}

func GetOptionsForQuestionHandler(c *fiber.Ctx) error {
	questionID, err := strconv.Atoi(c.Params("question_id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	options, err := option.GetOptionsForQuestion(db, questionID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.JSON(options)
}

func UpdateOptionHandler(c *fiber.Ctx) error {
	var opt option.Option
	if err := json.Unmarshal(c.Body(), &opt); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	if err := option.UpdateOption(db, &opt); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.JSON(opt)
}

func DeleteOptionHandler(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	if err := option.DeleteOption(db, id); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.SendStatus(fiber.StatusNoContent)
}
