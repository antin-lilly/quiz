package option

import (
	"gorm.io/gorm"
	"time"
)

type Option struct {
	ID         int       `json:"id"`
	QuestionID int       `json:"question_id"`
	OptionText string    `json:"option_text"`
	IsCorrect  bool      `json:"is_correct"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

func CreateOption(db *gorm.DB, option *Option) error {
	return db.Create(option).Error
}

func GetOptionsForQuestion(db *gorm.DB, questionID int) ([]Option, error) {
	var options []Option
	err := db.Where("question_id = ?", questionID).Find(&options).Error
	return options, err
}

func UpdateOption(db *gorm.DB, option *Option) error {
	return db.Save(option).Error
}

func DeleteOption(db *gorm.DB, id int) error {
	return db.Delete(&Option{}, id).Error
}
