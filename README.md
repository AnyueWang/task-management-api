# Task Management API

This project is a task management backend application built using Express.js, GraphQL (Apollo Server), Drizzle ORM, and PostgreSQL. It provides APIs to manage users and tasks with authentication and authorization features.

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [GraphQL Schema](#graphql-schema)

## Technologies

- **Backend Framework**: Express.js
- **GraphQL Server**: Apollo Server
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest, Supertest

## Features

- User registration and login with JWT-based authentication.
- Task management: Create, read, update, and delete tasks.
- GraphQL API with schema definitions and resolvers.
- Database migration using Drizzle ORM.

## Installation

### Prerequisites

Make sure you have the following installed:

  - Node.js (v16 or higher)
  - PostgreSQL

### Setup

1. Clone the repository:

```
git clone https://github.com/AnyueWang/task-management-api.git
cd task-management-api
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file at the root of the project with the following content:

```
# Backend server settings
PORT=4000
PORT_TEST=4001
JWT_SECRET_KEY=your-jwt-secret-key

# Database settings
DB_HOST=localhost
DB_PORT=your-db-port
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=taskdb
DB_NAME_TEST=taskdb_test
```

4. Create new databases named `taskdb` and `taskdb_test` (for testing):

```
CREATE DATABASE taskdb;
CREATE DATABASE taskdb_test;
```

5. Push database schema changes to database:

```
npm run drizzle:push
npm run drizzle:push-test
```

6. (Optional) Run seeders to generate fake data to database:

```
npm run drizzle:seeds
npm run drizzle:seeds-test
```

## Running the Application

### Start the server

```
npm start
```

The server will run at `http://localhost:4000`.

### Access GraphQL Playground

Visit `http://localhost:4000/graphql` to explore the APIs using the GraphQL playground.

## Testing

### Run tests:

```
npm test
```

This will execute all tests written using Jest and Supertest.

## Project Structure

The basic structure of the project is described as the following:

```
.
├── graphql                 # GraphQL-related codes
│   ├── contexts            # Contexts for managing authentication.
│   ├── resolvers           # Resolvers for handling GraphQL queries and mutations
│   ├── typeDefs            # GraphQL schema definitions
│   └── validators          # Input validation for GraphQL operations
├── models                  # Database models for interacting with the database
├── tests                   # Test files for API functionality
├── db                      # Database-related code
│   ├── index.ts            # Database initialization and connection setup
│   ├── migrations          # Database migration files
│   ├── schemas             # Database schemas
│   ├── seeds               # Seed data for populating the database
│   └── utils               # Utility functions for database management
├── index.ts                # Main entry point of the application
├── server.ts               # Server setup for GraphQL
└── utils                   # Utility functions
```

## Database Schema

### Users table

This table stores the details of users in the system.

| **Column**     | **Data Type**         | **Description**                                              |
|----------------|-----------------------|--------------------------------------------------------------|
| `id`           | `serial`              | Unique identifier for each user.                             |
| `name`         | `varchar(255)`         | Full name of the user.                                       |
| `email`        | `varchar(255)`         | User’s email address (must be unique).                       |
| `password`     | `varchar(255)`         | Hashed password for the user.                                |
| `created_at`   | `timestamp`            | Timestamp when the user was created (auto-generated).        |
| `updated_at`   | `timestamp`            | Timestamp of the user's last update (auto-generated).        |


### Tasks table

This table stores the details of tasks created by users.

| **Column**     | **Data Type**         | **Description**                                               |
|----------------|-----------------------|---------------------------------------------------------------|
| `id`           | `serial`              | Unique identifier for each task.                              |
| `title`        | `varchar(255)`         | Title of the task.                                            |
| `description`  | `text`                 | A brief description of the task.                              |
| `status`       | `status` (enum)        | The current status of the task (`'pending'` or `'completed'`). Default is `'pending'`. |
| `created_by`   | `integer`             | User ID of the person who created the task.                   |
| `created_at`   | `timestamp`            | Timestamp when the task was created (auto-generated).         |
| `updated_at`   | `timestamp`            | Timestamp of the task's last update (auto-generated).         |


## GraphQL schema

### Users schema:

This schema defines the types and mutations related to user authentication, allowing users to register, login, and receive authentication tokens.

#### Types
  - **User**: Represents a user in the system.
    - `id`: The unique identifier of the user.
    - `name`: The name of the user.
    - `email`: The email address of the user.
    - `created_at`: Timestamp when the user was created.
    - `updated_at`: Timestamp when the user was last updated.

  - AuthPayload: Used to return the authentication details after a successful login.
    - `user`: The authenticated `User` object.
    - `token`: The authentication `token` that can be used for subsequent requests.

#### Mutations
  - **register(name: String!, email: String!, password: String!, password_confirmation: String!)**: Registers a new user.
    - Takes `name`, `email`, `password`, and `password_confirmation` (required) as inputs.
    - Returns the newly created `User` object.
  - **login(email: String!, password: String!)**: Logs in an existing user.
    - Takes `email` and `password` (required) as inputs.
    - Returns an `AuthPayload` containing the `user` object and an authentication `token`.


### Tasks schema

This schema defines types, queries, and mutations for managing tasks in the system. The API allows users to perform CRUD operations on tasks, with each task being associated with a user. Note that all the operations should be processed with authentication token. 

#### Enums
  - **TaskStatus**: Represents the possible statuses of a task.
    - `pending`: Task is still in progress.
    - `completed`: Task has been completed.

#### Types
  - **SuccessMessage**: A type used to return a success message for certain mutations (e.g., task deletion).
    - `message`: A string that describes the success of the operation.
  - **User**: Represents a user in the system.
    - `id`: The unique identifier of the user.
    - `name`: The name of the user.
    - `email`: The email address of the user.
    - `created_at`: Timestamp when the user was created.
    - `updated_at`: Timestamp when the user was last updated.
  - **Task**: Represents a task in the system.
    - `id`: The unique identifier of the task.
    - `title`: The title of the task.
    - `description`: A brief description of the task.
    - `status`: The current status of the task (`pending` or `completed`).
    - `created_by`: The user who created the task (associated via the `User` type).
    - `created_at`: Timestamp when the task was created.
    - `updated_at`: Timestamp when the task was last updated.

#### Queries
  - **getAllTasks**: Retrieves all tasks in the system.
    - Returns a list of `Task` objects.
  - **getTask(taskId: Int!)**: Retrieves a specific task by its `taskId`.
    - Takes a `taskId` as input (required).
    - Returns a single `Task` object.

#### Mutations
  - **createTas(title: String!, description: String, status: TaskStatus!)**: Creates a new task.
    - Takes `title`, `description`, and `status` (required) as input.
    - Returns the newly created `Task` object.
  - **updateTask(taskId: Int!, title: String, description: String, status: TaskStatus)**: Updates an existing task.
    - Takes `taskId` (required), and optionally `title`, `description`, and `status` as inputs.
    - Returns the updated `Task` object.
    - Users can only update tasks they created.
  - **deleteTask(taskId: Int!)**: Deletes a task.
    - Takes `taskId` (required) as input.
    - Returns a `SuccessMessage` indicating whether the deletion was successful.
    - Users can only delete tasks they created.
