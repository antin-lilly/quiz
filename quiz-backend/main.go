package main

import (
	"log"
	"q3/rnd/src/database"
	"q3/rnd/src/model/todo"
	"q3/rnd/src/web"
)

func main() {
	database.Connect()
	if err := database.DB.AutoMigrate(&todo.TODO{}); err != nil {
		log.Fatal(err)
	}

	if err := web.Create().Listen(":8080"); err != nil {
		log.Fatal(err)
	}
}
