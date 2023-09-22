package option

import (
	"fmt"
	"gorm.io/gorm"
	"time"
)

type Option struct {
	ID         string    `json:"id"`
	QuestionID string    `json:"question_id"`
	OptionText string    `json:"option_text"`
	IsCorrect  bool      `json:"is_correct"`
	CreatedAt  time.Time `json:"created-at"`
	UpdatedAt  time.Time `json:"updated-at"`
}

func CreateOption(db *gorm.DB, option *Option) error {
	return db.Create(option).Error
}

func GetOptionsForQuestion(db *gorm.DB, questionID string) ([]Option, error) {
	var options []Option
	if err := db.Where("question_id = ?", questionID).Find(&options).Error; err != nil {
		return nil, err
	}
	return options, nil
}

func UpdateOption(db *gorm.DB, option *Option) error {
	return db.Save(option).Error
}

func DeleteOption(db *gorm.DB, id string) error {
	options, err := GetOptionsForQuestion(db, id)
	if err != nil {
		return err
	}
	if len(options) == 0 {
		return fmt.Errorf("no options found with ID %s", id)
	}
	option := &Option{}
	return db.Where("id = ?", id).Delete(option).Error
}
