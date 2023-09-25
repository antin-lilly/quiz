package quiz_service

import (
	"gorm.io/gorm"
	"q3/rnd/src/model"
)

// Create new Quiz in DB
func Create(db *gorm.DB, t *model.Quiz) error {
	return db.Create(t).Error
}

// Read one Quiz from DB by ID
func Read(db *gorm.DB, t *model.Quiz, id string) error {
	return db.Where("id = ?", id).First(t).Error
}

// ReadAll Quiz from DB
func ReadAll(db *gorm.DB, t *[]model.Quiz) error {
	return db.Find(t).Error
}

// Update Quiz in DB
func Update(db *gorm.DB, t *model.Quiz) error {
	return db.Save(t).Error
}

// Delete Quiz from DB
func Delete(db *gorm.DB, t *model.Quiz) error {
	return db.Delete(t).Error
}

// DeleteByID one Quiz by ID
func DeleteByID(db *gorm.DB, id string) error {
	quiz := &model.Quiz{}
	if err := Read(db, quiz, id); err != nil {
		return err
	}
	return db.Where("id = ?", id).Delete(quiz).Error

}
