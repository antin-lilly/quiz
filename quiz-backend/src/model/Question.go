package model

import (
	"gorm.io/gorm"
)

// Quiz db model
type Question struct {
	gorm.Model
	ID        string
	Quiz   Quiz `gorm:"constraint:SET NULL;"`
	QuestionText      string
	QuestionType      int
}
