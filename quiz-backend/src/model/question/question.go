package question

import (
	"gorm.io/gorm"
	"time"
)

type QuestionType int

type Question struct {
	ID           int          `json:"id"`
	QuizID       int          `json:"quiz_id"`
	QuestionText string       `json:"question_text"`
	QuestionType QuestionType `json:"question_type"`
	CreatedAt    time.Time    `json:"created_at"`
	UpdatedAt    time.Time    `json:"updated_at"`
}

func (q Question) CreateQuestion(db *gorm.DB, question *Question) error {
	return db.Create(question).Error
}

func GetQuestionsForQuiz(db *gorm.DB, quizID int) ([]Question, error) {
	var questions []Question
	err := db.Where("quiz_id = ?", quizID).Find(&questions).Error
	return questions, err
}
func (q Question) UpdateQuestion(db *gorm.DB, question *Question) error {
	return db.Save(question).Error
}

func DeleteQuestion(db *gorm.DB, id int) error {
	return db.Delete(&Question{}, id).Error
}
