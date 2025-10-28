## Auth Service

A lightweight authentication and authorization microservice built with Node.js, Express, and Sequelize ORM, supporting both MySQL and SQLite for flexible development and testing.
It provides secure user authentication using JWTs, password hashing, and environment-based configuration for seamless deployment.

## Features

User registration and login with JWT authentication

Password hashing using bcrypt

Centralized error handling

Environment-based configuration (.env) Separate configs for dev, test, and production

Rate limiting to prevent brute-force attacks

Sequelize ORM with MySQL and SQLite (for testing)

Jest and Supertest for integration testing

Dockerized setup with Docker Compose

## Running Tests

- npm test
  Tests are written using Jest and Supertest.
  Test configuration uses SQLite (in-memory) to isolate tests from production or development databases.

## Development commands

# Run app locally

npm run dev

# Run tests in container

docker exec -it auth-service npm test

# build container

docker-compose up --build

# Stop container

docker-compose down

## Dependencies

Node.js, Express, MySQL, Sequelize ORM
Jest, Supertest (Testing)
JWT, bcrypt, rate-limiter (Security)
Docker, Docker Compose (Containerization)

## Author

Emeh Stanley (Eucas)
stanemeh808@gmail.com
Backend Developer
