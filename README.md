# Task Management API

This project is a task management backend application built using Express.js, GraphQL (Apollo Server), Drizzle ORM, and PostgreSQL. It provides APIs to manage users and tasks with authentication and authorization features.

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)

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

