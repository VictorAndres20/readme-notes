# Go - Claude Help

## Installation & Setup

### Install Go

```bash
# Download from https://go.dev/dl/
# Or use asdf
asdf plugin add golang
asdf install golang latest

# If you want a global version
asdf global golang latest

# Verify installation
go version
```

### Initialize a Module

```bash
mkdir my-api && cd my-api
go mod init github.com/yourusername/my-api
```

## Go Basics

### Variables & Types

```go
package main

import "fmt"

func main() {
    // Variable declaration
    var name string = "Victor"
    age := 30  // Short declaration (type inference)
    
    // Basic types
    var (
        isActive bool = true
        count int = 42
        price float64 = 19.99
    )
    
    // Constants
    const maxRetries = 3
    
    // Arrays & Slices
    var arr [5]int  // Fixed size array
    slice := []string{"Go", "TypeScript", "Python"}  // Dynamic slice
    
    // Maps (like objects in JS)
    userMap := map[string]string{
        "name": "Victor",
        "role": "developer",
    }
    
    fmt.Println(name, age, isActive, count, price, slice, userMap)
}
```

### Structs (Like Classes)

```go
// Define a struct (similar to TypeScript interfaces)
type User struct {
    ID        int       `json:"id"`
    Name      string    `json:"name"`
    Email     string    `json:"email"`
    CreatedAt time.Time `json:"created_at"`
}

// Constructor function
func NewUser(name, email string) *User {
    return &User{
        ID:        1,
        Name:      name,
        Email:     email,
        CreatedAt: time.Now(),
    }
}

// Methods (like class methods)
func (u *User) FullInfo() string {
    return fmt.Sprintf("%s (%s)", u.Name, u.Email)
}

// Usage
user := NewUser("Victor", "victor@televet.com")
fmt.Println(user.FullInfo())
```

### Pointers

```go
// Go uses pointers (similar to C, but safer)
func updateName(u *User) {
    u.Name = "Updated Name"  // Modifies original
}

user := &User{Name: "Victor"}
updateName(user)
fmt.Println(user.Name)  // "Updated Name"
```

### Error Handling

```go
// Go doesn't use try/catch - errors are values
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("cannot divide by zero")
    }
    return a / b, nil
}

// Usage
result, err := divide(10, 2)
if err != nil {
    log.Fatal(err)  // Handle error
}
fmt.Println(result)
```

### Interfaces

```go
// Interfaces are implemented implicitly
type Repository interface {
    Save(user *User) error
    FindByID(id int) (*User, error)
}

// Any type with these methods implements Repository
type PostgresRepo struct {
    db *sql.DB
}

func (r *PostgresRepo) Save(user *User) error {
    // Implementation
    return nil
}

func (r *PostgresRepo) FindByID(id int) (*User, error) {
    // Implementation
    return nil, nil
}
```

### Generics

Type Parameters

```go
// Basic generic function
func Print[T any](value T) {
    fmt.Println(value)
}

// Usage
Print[string]("Hello")  // Explicit type
Print(42)               // Type inference
Print(3.14)
```

Generic Types

```go
// Generic struct
type Stack[T any] struct {
    items []T
}

// Methods on generic types
func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T  // Return zero value for type T
        return zero, false
    }
    
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item, true
}

func (s *Stack[T]) IsEmpty() bool {
    return len(s.items) == 0
}

// Usage
intStack := Stack[int]{}
intStack.Push(1)
intStack.Push(2)
value, ok := intStack.Pop()  // value = 2

stringStack := Stack[string]{}
stringStack.Push("hello")
stringStack.Push("world")
```

Built-in Constraints

```go
// 'any' - accepts any type (alias for interface{})
func Identity[T any](value T) T {
    return value
}

// 'comparable' - types that support == and !=
func Contains[T comparable](slice []T, value T) bool {
    for _, item := range slice {
        if item == value {
            return true
        }
    }
    return false
}

// Usage
Contains([]int{1, 2, 3}, 2)           // true
Contains([]string{"a", "b"}, "c")     // false
```

### Goroutines (Concurrency)

```go
// Launch concurrent functions with 'go' keyword
func processData(id int) {
    fmt.Printf("Processing %d\n", id)
}

// Start 10 concurrent goroutines
for i := 0; i < 10; i++ {
    go processData(i)
}

// Channels for communication between goroutines
ch := make(chan string)

go func() {
    ch <- "Hello from goroutine"
}()

message := <-ch  // Receive from channel
fmt.Println(message)
```

## Building a REST API

### Project Structure

```
my-project/
├── cmd/
│   └── api/
│       └── main.go          # Application entry point
├── internal/
│   ├── handlers/            # HTTP handlers
│   ├── models/              # Data models
│   ├── services/            # Business logic
│   └── database/            # Database layer
├── pkg/                     # Public packages
├── go.mod                   # Module definition
└── go.sum                   # Dependency checksums
```

### Option 1: Standard Library (No Framework)

```go
package main

import (
    "encoding/json"
    "log"
    "net/http"
    "time"
)

type Response struct {
    Message string    `json:"message"`
    Time    time.Time `json:"time"`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
    // Set response header
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    
    // Send JSON response
    json.NewEncoder(w).Encode(Response{
        Message: "API is running",
        Time:    time.Now(),
    })
}

func getUserHandler(w http.ResponseWriter, r *http.Request) {
    // Only allow GET
    if r.Method != http.MethodGet {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }
    
    // Mock user data
    user := map[string]interface{}{
        "id":    1,
        "name":  "Victor",
        "email": "victor@televet.com",
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}

func main() {
    // Register routes
    http.HandleFunc("/health", healthHandler)
    http.HandleFunc("/api/users", getUserHandler)
    
    // Start server
    log.Println("Server starting on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal(err)
    }
}
```

### Option 2: Using Gin Framework (Recommended, similar to Express)

```go
package main

import (
    "net/http"
    "time"
    
    "github.com/gin-gonic/gin"
)

type User struct {
    ID        int       `json:"id"`
    Name      string    `json:"name" binding:"required"`
    Email     string    `json:"email" binding:"required,email"`
    CreatedAt time.Time `json:"created_at"`
}

var users = []User{
    {ID: 1, Name: "Victor", Email: "victor@televet.com", CreatedAt: time.Now()},
}

func main() {
    // Create router (similar to Express app)
    r := gin.Default()
    
    // Middleware (like Express middleware)
    r.Use(corsMiddleware())
    
    // Routes
    api := r.Group("/api")
    {
        api.GET("/health", healthCheck)
        api.GET("/users", getUsers)
        api.GET("/users/:id", getUserByID)
        api.POST("/users", createUser)
        api.PUT("/users/:id", updateUser)
        api.DELETE("/users/:id", deleteUser)
    }
    
    // Start server
    r.Run(":8080")
}

func healthCheck(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
        "status": "ok",
        "time":   time.Now(),
    })
}

func getUsers(c *gin.Context) {
    c.JSON(http.StatusOK, users)
}

func getUserByID(c *gin.Context) {
    id := c.Param("id")
    
    // Find user logic here
    c.JSON(http.StatusOK, gin.H{
        "id": id,
        "message": "User found",
    })
}

func createUser(c *gin.Context) {
    var newUser User
    
    // Bind JSON body to struct (with validation)
    if err := c.ShouldBindJSON(&newUser); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    newUser.ID = len(users) + 1
    newUser.CreatedAt = time.Now()
    users = append(users, newUser)
    
    c.JSON(http.StatusCreated, newUser)
}

func updateUser(c *gin.Context) {
    id := c.Param("id")
    var updates User
    
    if err := c.ShouldBindJSON(&updates); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    // Update logic here
    c.JSON(http.StatusOK, gin.H{
        "id": id,
        "message": "User updated",
    })
}

func deleteUser(c *gin.Context) {
    id := c.Param("id")
    
    // Delete logic here
    c.JSON(http.StatusOK, gin.H{
        "id": id,
        "message": "User deleted",
    })
}

func corsMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        
        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(http.StatusNoContent)
            return
        }
        
        c.Next()
    }
}
```

### Install Gin

```bash
go get -u github.com/gin-gonic/gin
```

### Database Integration (PostgreSQL)

```go
package database

import (
    "database/sql"
    "fmt"
    
    _ "github.com/lib/pq"
)

type Config struct {
    Host     string
    Port     int
    User     string
    Password string
    DBName   string
}

func Connect(cfg Config) (*sql.DB, error) {
    dsn := fmt.Sprintf(
        "host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
        cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.DBName,
    )
    
    db, err := sql.Open("postgres", dsn)
    if err != nil {
        return nil, err
    }
    
    // Test connection
    if err := db.Ping(); err != nil {
        return nil, err
    }
    
    return db, nil
}

// Repository pattern (like you use in NestJS)
type UserRepository struct {
    db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
    return &UserRepository{db: db}
}

func (r *UserRepository) FindAll() ([]User, error) {
    rows, err := r.db.Query("SELECT id, name, email, created_at FROM users")
    if err != nil {
        return nil, err
    }
    defer rows.Close()
    
    var users []User
    for rows.Next() {
        var u User
        if err := rows.Scan(&u.ID, &u.Name, &u.Email, &u.CreatedAt); err != nil {
            return nil, err
        }
        users = append(users, u)
    }
    
    return users, nil
}

func (r *UserRepository) Create(user *User) error {
    query := `INSERT INTO users (name, email, created_at) 
              VALUES ($1, $2, $3) RETURNING id`
    
    return r.db.QueryRow(query, user.Name, user.Email, time.Now()).Scan(&user.ID)
}
```

### Environment Variables

```go
package config

import (
    "os"
    "strconv"
)

type Config struct {
    Port         string
    DatabaseURL  string
    JWTSecret    string
}

func Load() Config {
    return Config{
        Port:        getEnv("PORT", "8080"),
        DatabaseURL: getEnv("DATABASE_URL", ""),
        JWTSecret:   getEnv("JWT_SECRET", ""),
    }
}

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}
```

## Best Practices

### 1. Project Organization

```
cmd/api/main.go           # Entry point
internal/                 # Private application code
  ├── handlers/           # HTTP handlers
  ├── services/           # Business logic
  ├── repository/         # Database layer
  └── models/             # Data structures
pkg/                      # Public libraries
config/                   # Configuration
```

### 2. Error Handling

```go
// Create custom errors
type AppError struct {
    Code    int
    Message string
}

func (e *AppError) Error() string {
    return e.Message
}

// Wrap errors with context
if err != nil {
    return fmt.Errorf("failed to save user: %w", err)
}
```

### 3. Use Context for Timeouts

```go
import "context"

ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

// Use ctx in database calls
rows, err := db.QueryContext(ctx, "SELECT * FROM users")
```

### 4. Testing

```go
package handlers

import (
    "testing"
    "net/http/httptest"
    "github.com/gin-gonic/gin"
)

func TestHealthCheck(t *testing.T) {
    gin.SetMode(gin.TestMode)
    
    w := httptest.NewRecorder()
    c, _ := gin.CreateTestContext(w)
    
    healthCheck(c)
    
    if w.Code != 200 {
        t.Errorf("Expected status 200, got %d", w.Code)
    }
}
```

### 5. Graceful Shutdown

```go
srv := &http.Server{
    Addr:    ":8080",
    Handler: router,
}

go func() {
    if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
        log.Fatalf("listen: %s\n", err)
    }
}()

// Wait for interrupt signal
quit := make(chan os.Signal, 1)
signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
<-quit

log.Println("Shutting down server...")

ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

if err := srv.Shutdown(ctx); err != nil {
    log.Fatal("Server forced to shutdown:", err)
}

log.Println("Server exited")
```

## Common Commands

```bash
# Run the application
go run cmd/api/main.go

# Build binary
go build -o bin/api cmd/api/main.go

# Run tests
go test ./...

# Format code
go fmt ./...

# Install dependencies
go mod download

# Clean up dependencies
go mod tidy

# Add dependency
go get github.com/gin-gonic/gin

# Hot reload (install air first)
go install github.com/cosmtrek/air@latest
air
```

## Useful Libraries

- **Web Framework**: `github.com/gin-gonic/gin`
- **Database**: `github.com/lib/pq` (PostgreSQL), `gorm.io/gorm` (ORM)
- **Environment**: `github.com/joho/godotenv`
- **Validation**: `github.com/go-playground/validator/v10`
- **JWT**: `github.com/golang-jwt/jwt/v5`
- **HTTP Client**: Built-in `net/http` or `github.com/go-resty/resty/v2`
- **Testing**: Built-in `testing` package
- **Logging**: `github.com/sirupsen/logrus` or `go.uber.org/zap`

## Quick Start Template

```bash
# Install dependencies
go get github.com/gin-gonic/gin
go get github.com/lib/pq
go get github.com/joho/godotenv
```

```go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()
    
    r.GET("/health", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "status": "ok",
        })
    })
    
    r.Run(":8080")
}

```

## Coming from TypeScript/NestJS

| Concept | TypeScript/NestJS | Go |
|---------|------------------|-----|
| Classes | `class User {}` | `type User struct {}` |
| Interfaces | `interface IRepo {}` | `type Repo interface {}` |
| Async/Await | `async/await` | Goroutines & Channels |
| Error Handling | `try/catch` | `if err != nil` |
| Dependency Injection | Constructor injection | Pass dependencies explicitly |
| Decorators | `@Get()` | Manual routing |
| Modules | Import/Export | `package` system |

