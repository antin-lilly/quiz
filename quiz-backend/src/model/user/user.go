package user

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        int64     `gorm:"primary_key;auto_increment;not_null"`
	Username  string    `json:"username"`
	Password  string    `json:"password"`
	Admin     bool      `json:"admin"`
	CreatedAt time.Time `json:"created-at"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func CreateUser(db *gorm.DB, user *User) error {
	return db.Create(user).Error
}

func GetUserByID(db *gorm.DB, u *User, id string) error {
	return db.Where("id = ?", id).First(u).Error
}

func GetUserByUsername(db *gorm.DB, u *User, username string) error {
	return db.Where("username = ?", username).First(u).Error
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

func AuthenticateUser(db *gorm.DB, username, password string) (*User, error) {
	user := &User{}

	if err := db.Where("username = ? AND password = ?", username, password).First(user).Error; err != nil {
		return nil, err
	}

	return user, nil
}
