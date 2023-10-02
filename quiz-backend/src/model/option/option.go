package option

import (
	"fmt"
	"gorm.io/gorm"
	"time"
)

type Option struct {
	ID         int64     `gorm:"primary_key;auto_increment;not_null"`
	QuestionID int64     `json:"questionId"`
	OptionText string    `json:"optionText"`
	IsCorrect  bool      `json:"isCorrect"`
	CreatedAt  time.Time `json:"createdAt"`
	UpdatedAt  time.Time `json:"updatedAt"`
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
	option := getOne(db, id)
	if option != nil {
		return fmt.Errorf("no options found with ID %s", id)
	}
	return db.Where("id = ?", id).Delete(&Option{}).Error
}

func getOne(db *gorm.DB, id string) error {
	return db.Where("id = ?", id).First(&Option{}).Error
}
