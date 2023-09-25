package quiz

import (
	"gorm.io/gorm"
	"time"
)

type Quiz struct {
	ID               int64     `gorm:"primary_key;auto_increment;not_null"`
	Title            string    `json:"title"`
	Description      string    `json:"description"`
	UniqueIdentifier string    `json:"uniqueIdentifier"`
	CreatedAt        time.Time `json:"createdAt"`
	UpdatedAt        time.Time `json:"updatedAt"`
}

func CreateQuiz(db *gorm.DB, quiz *Quiz) error {
	return db.Create(quiz).Error
}

func GetQuizByID(db *gorm.DB, q *Quiz, id string) error {
	return db.Where("id = ?", id).First(q).Error
}

func GetAll(db *gorm.DB, t *[]Quiz) error {
	return db.Find(t).Error
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
