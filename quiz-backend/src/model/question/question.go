package question

import (
	"fmt"
	"gorm.io/gorm"
	"q3/rnd/src/enums"
	"time"
)

type Question struct {
	ID           string             `json:"id"`
	QuizID       string             `json:"quiz_id"`
	QuestionText string             `json:"question_text"`
	QuestionType enums.QuestionType `json:"question_type"`
	CreatedAt    time.Time          `json:"created-at"`
	UpdatedAt    time.Time          `json:"updated-at"`
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
	questions, err := GetQuestionsForQuiz(db, id)
	if err != nil {
		return err
	}
	if len(questions) == 0 {
		return fmt.Errorf("no questions found with ID %s", id)
	}
	question := &Question{}
	return db.Where("id = ?", id).Delete(question).Error
}
