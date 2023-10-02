package model

import (
	"gorm.io/gorm"
)

// Quiz db model
type Quiz struct {
	gorm.Model
	ID        string `json:""`
	Title   string `json:""`
	Description      string `json:""`
}
