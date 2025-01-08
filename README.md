# Task Management API

This project is a task management backend application built using Express.js, GraphQL (Apollo Server), Drizzle ORM, and PostgreSQL.

## Table of Contents

## Technologies

## Features

## Installation

Create `.env` file at the root of the project and set parameters as the following:
```env
# Backend server settings
PORT=4000

# Database settings
DB_HOST=localhost
DB_PORT=YOUR_DB_PORT
DB_USER=YOUR_DB_USER_NAME
DB_PASSWORD=YOUR_DB_USER_PASSWORD
DB_NAME=taskdb
```

create new database named "taskdb" in your local db server.

run database migration.
```bash
npx drizzle-kit migrate
```


## Running the Application

