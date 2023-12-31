package database

import (
	"fmt"
	"log"
	"os"
	"q3/rnd/src/model/option"
	"q3/rnd/src/model/question"
	"q3/rnd/src/model/quiz"
	"q3/rnd/src/model/todo"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	dbhost     = ""
	dbport     = ""
	dbuser     = ""
	dbpassword = ""
	dbname     = ""
)

// DB is connected MySQL DB
var DB *gorm.DB

func init() {
	dbhost = os.Getenv("DBHOST")
	dbport = os.Getenv("DBPORT")
	dbuser = os.Getenv("DBUSER")
	dbpassword = os.Getenv("DBPASSWORD")
	dbname = os.Getenv("DBNAME")
}

func GetConfig() (string, string, string, string, string) {
	return dbhost, dbport, dbuser, dbpassword, dbname
}

func SetupGorm(db *gorm.DB) {
	db.Callback().Create().Before("gorm:create").Register("setCreatedAt", setCreatedAt)
	db.Callback().Update().Before("gorm:update").Register("setUpdatedAt", setUpdatedAt)
}

func setCreatedAt(db *gorm.DB) {
	now := time.Now()
	db.Statement.SetColumn("CreatedAt", now)
	db.Statement.SetColumn("UpdatedAt", now)
}

func setUpdatedAt(db *gorm.DB) {
	now := time.Now()
	db.Statement.SetColumn("UpdatedAt", now)
}

// Connect to MySQL server
func Connect() {
	fmt.Println(dbhost)
	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbuser,
		dbpassword,
		dbhost,
		dbport,
		dbname,
	)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	DB = db
	err = db.AutoMigrate(&todo.TODO{}, &quiz.Quiz{}, &question.Question{}, &option.Option{})
	if err != nil {
		panic("Failed to auto-migrate database tables")
	}
	SetupGorm(db)
}
