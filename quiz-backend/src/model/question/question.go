package question

import (
	"fmt"
	"gorm.io/gorm"
	"q3/rnd/src/enums"
	"time"
)

type Question struct {
	ID           int64              `gorm:"primary_key;auto_increment;not_null"`
	QuizID       int64              `json:"quizId"`
	QuestionText string             `json:"questionText"`
	QuestionType enums.QuestionType `json:"questionType"`
	CreatedAt    time.Time          `json:"createdAt"`
	UpdatedAt    time.Time          `json:"updatedAt"`
}

func CreateQuestion(db *gorm.DB, question *Question) error {
	return db.Create(question).Error
}

func GetQuestionsForQuiz(db *gorm.DB, quizID string) ([]Question, error) {
	var questions []Question
	if err := db.Where("quiz_id = ?", quizID).Find(&questions).Error; err != nil {
		return nil, err
	}
	return questions, nil
}

func UpdateQuestion(db *gorm.DB, question *Question) error {
	return db.Save(question).Error
}

func DeleteQuestion(db *gorm.DB, id string) error {
	option := getOne(db, id)
	if option != nil {
		return fmt.Errorf("no questions found with ID %s", id)
	}
	return db.Where("id = ?", id).Delete(&Question{}).Error
}

func getOne(db *gorm.DB, id string) error {
	return db.Where("id = ?", id).First(&Question{}).Error
}
