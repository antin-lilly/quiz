package quiz

import (
	"gorm.io/gorm"
	"time"
)

type Quiz struct {
	ID               string    `json:"id"`
	Title            string    `json:"title"`
	Description      string    `json:"description"`
	UniqueIdentifier string    `json:"unique_identifier"`
	CreatedAt        time.Time `json:"created-at"`
	UpdatedAt        time.Time `json:"updated-at"`
}

func CreateQuiz(db *gorm.DB, quiz *Quiz) error {
	return db.Create(quiz).Error
}

func GetQuizByID(db *gorm.DB, q *Quiz, id string) error {
	return db.Where("id = ?", id).First(q).Error
}

func UpdateQuiz(db *gorm.DB, quiz *Quiz) error {
	return db.Save(quiz).Error
}

func DeleteQuiz(db *gorm.DB, id string) error {
	quiz := &Quiz{}
	if err := GetQuizByID(db, quiz, id); err != nil {
		return err
	}
	return db.Where("id = ?", id).Delete(quiz).Error
}
