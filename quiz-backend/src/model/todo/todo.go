package todo

import (
	"gorm.io/gorm"
	"time"
)

type TODO struct {
	gorm.Model
	ID        string    `json:""`
	CreatedAt time.Time `json:""`
	Done      bool      `json:""`
	Subject   string    `json:""`
	Note      string    `json:""`
}

func Create(db *gorm.DB, t *TODO) error {
	return db.Create(t).Error
}

func Read(db *gorm.DB, t *TODO, id string) error {
	return db.Where("id = ?", id).First(t).Error
}

func ReadAll(db *gorm.DB, t *[]TODO) error {
	return db.Find(t).Error
}

func Update(db *gorm.DB, t *TODO) error {
	return db.Save(t).Error
}

func Delete(db *gorm.DB, t *TODO) error {
	return db.Delete(t).Error
}

func DeleteByID(db *gorm.DB, id string) error {
	todo := &TODO{}
	if err := Read(db, todo, id); err != nil {
		return err
	}
	return db.Where("id = ?", id).Delete(todo).Error

}
