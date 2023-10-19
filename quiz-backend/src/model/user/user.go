package user

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        int64     `gorm:"primary_key;auto_increment;not_null"`
	FirstName string    `json:"firstname"`
	LastName  string    `json:"lastname"`
	Username  string    `json:"username"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created-at"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func CreateUser(db *gorm.DB, user *User) error {
	return db.Create(user).Error
}

func GetUserByID(db *gorm.DB, u *User, id string) error {
	return db.Where("id = ?", id).First(u).Error
}

func GetAll(db *gorm.DB, t *[]User) error {
	return db.Find(t).Error
}

func UpdateUser(db *gorm.DB, user *User) error {
	return db.Save(user).Error
}

func DeleteUser(db *gorm.DB, id string) error {
	user := &User{}
	if err := GetUserByID(db, user, id); err != nil {
		return err
	}
	return db.Where("id = ?", id).Delete(user).Error
}
