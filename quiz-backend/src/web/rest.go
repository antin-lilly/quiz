package web

import (
	"q3/rnd/src/middleware"
	"q3/rnd/src/web/controller"

	"github.com/gofiber/fiber/v2"
)

// Create new REST API serveer
func Create() *fiber.App {
	app := fiber.New()

	app.Get("/", controller.Index)

	app.Get("/api/todos/:id", middleware.AuthMiddleware(), controller.TodoGet)
	app.Get("/api/todos", middleware.AuthMiddleware(), controller.TodoGetAll)
	app.Post("/api/todos", middleware.AuthMiddleware(), controller.TodoPost)
	app.Put("/api/todos", middleware.AuthMiddleware(), controller.TodoPut)
	app.Delete("/api/todos", middleware.AuthMiddleware(), controller.TodoDel)

	//options
	app.Post("/api/options", middleware.AuthMiddleware(), controller.CreateOptionHandler)
	app.Put("/api/options/:id", middleware.AuthMiddleware(), controller.UpdateOptionHandler)
	app.Delete("/api/options/:id", middleware.AuthMiddleware(), controller.DeleteOptionHandler)
	app.Get("/api/questions/:question_id/options", middleware.AuthMiddleware(), controller.GetOptionsForQuestionHandler)

	//questions
	app.Post("/api/questions", middleware.AuthMiddleware(), controller.CreateQuestionHandler)
	app.Put("/api/questions/:id", middleware.AuthMiddleware(), controller.UpdateQuestionHandler)
	app.Delete("/api/questions/:id", middleware.AuthMiddleware(), controller.DeleteQuestionHandler)
	app.Get("/api/quizzes/:quiz_id/questions", middleware.AuthMiddleware(), controller.GetQuestionsForQuizHandler)

	//quiz
	app.Post("/api/quizzes", middleware.AuthMiddleware(), controller.CreateQuizHandler)
	app.Get("/api/quizzes", middleware.AuthMiddleware(), controller.GetQuizzes)
	app.Get("/api/quizzes/:id", middleware.AuthMiddleware(), controller.GetQuizByIDHandler)
	app.Put("/api/quizzes/:id", middleware.AuthMiddleware(), controller.UpdateQuizHandler)
	app.Delete("/api/quizzes/:id", middleware.AuthMiddleware(), controller.DeleteQuizHandler)

	//user
	app.Post("/api/users", controller.CreateUserHandler)
	app.Get("/api/users", middleware.AuthMiddleware(), controller.GetUsers)
	app.Get("/api/users/:id", middleware.AuthMiddleware(), controller.GetUserByIDHandler)
	app.Put("/api/users/:id", middleware.AuthMiddleware(), controller.UpdateUserHandler)
	app.Delete("/api/users/:id", middleware.AuthMiddleware(), controller.DeleteUserHandler)
	app.Post("/api/users/login", controller.AuthenticateUserHandler)
	app.Get("/api/me", middleware.AuthMiddleware(), controller.CurrentUserHandler)

	app.Get("/config", Config)

	return app
}
