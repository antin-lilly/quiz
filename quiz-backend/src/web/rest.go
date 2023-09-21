package web

import (
	"github.com/gofiber/fiber/v2"
	"q3/rnd/src/web/controller"
)

// Create new REST API serveer
func Create() *fiber.App {
	app := fiber.New()

	app.Get("/", controller.Index)

	app.Get("/api/todos/:id", controller.TodoGet)
	app.Get("/api/todos", controller.TodoGetAll)
	app.Post("/api/todos", controller.TodoPost)
	app.Put("/api/todos", controller.TodoPut)
	app.Delete("/api/todos", controller.TodoDel)

	//options
	app.Post("/api/options", controller.CreateOptionHandler)
	app.Get("/api/options/:id", controller.GetOptionsForQuestionHandler)
	app.Put("/api/options/:id", controller.UpdateOptionHandler)
	app.Delete("/api/options/:id", controller.DeleteOptionHandler)
	app.Get("/api/questions/:question_id/options", controller.GetOptionsForQuestionHandler)

	//questions
	app.Post("/api/questions", controller.CreateQuestionHandler)
	app.Get("/api/questions/:id", controller.GetQuestionsForQuizHandler)
	app.Put("/api/questions/:id", controller.UpdateQuestionHandler)
	app.Delete("/api/questions/:id", controller.DeleteQuestionHandler)
	app.Get("/api/quizzes/:quiz_id/questions", controller.GetQuestionsForQuizHandler)

	//quiz
	app.Post("/api/quizzes", controller.CreateQuizHandler)
	app.Get("/api/quizzes/:id", controller.GetQuizByIDHandler)
	app.Put("/api/quizzes/:id", controller.UpdateQuizHandler)
	app.Delete("/api/quizzes/:id", controller.DeleteQuizHandler)

	app.Get("/config", Config)

	return app
}
