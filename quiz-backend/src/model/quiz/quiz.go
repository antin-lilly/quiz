package quiz

import (
	"gorm.io/gorm"
	"time"
)

type Quiz struct {
	ID               int       `json:"id"`
	Title            string    `json:"title"`
	Description      string    `json:"description"`
	UniqueIdentifier string    `json:"unique_identifier"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

func (q Quiz) CreateQuiz(db *gorm.DB, quiz *Quiz) error {
	return db.Create(quiz).Error
}

func GetQuizByID(db *gorm.DB, id int) (*Quiz, error) {
	var quiz Quiz
	err := db.First(&quiz, id).Error
	return &quiz, err
}

func (q Quiz) UpdateQuiz(db *gorm.DB, quiz *Quiz) error {
	return db.Save(quiz).Error
}

func DeleteQuiz(db *gorm.DB, id int) error {
	return db.Delete(&Quiz{}, id).Error
}
