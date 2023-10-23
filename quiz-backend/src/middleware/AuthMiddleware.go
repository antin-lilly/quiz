package middleware

import (
	auth_service "q3/rnd/src/service/auth-service"

	"github.com/gofiber/fiber/v2"

	"github.com/golang-jwt/jwt"
)

func AuthMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		tokenString := c.Get("Authorization")

		if tokenString == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "Unauthorized",
			})
		}

		token, err := auth_service.VerifyToken(tokenString)
		if err != nil || !token.Valid {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "Invalid token",
			})
		}

		claims := token.Claims.(jwt.MapClaims)
		userID := int64(claims["user_id"].(float64))
		c.Locals("user_id", userID)

		return c.Next()
	}
}
