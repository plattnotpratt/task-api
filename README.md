# Task API

A simple and easy-to-use REST API for managing a Task List API. This API allows users to perform CRUD operations (Create, Read, Update, Delete) on tasks.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)

## Features

- **Create Tasks**: Add new tasks to the ToDo list.
- **View Tasks**: Retrieve a list of tasks or a specific task by ID.
- **Update Tasks**: Modify existing tasks (e.g., mark them as completed).
- **Delete Tasks**: Remove tasks from the list.

## Tech Stack

- **Backend**: Node.js (Express) 
- **Database**: MySQL through (Docker)
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger
- **Testing**: Mocha/Chai (Node)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- Docker

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/todo-list-api.git

2. Spin up the docker container (MySQL Server + Volume)
    ```bash
    docker-compose -f docker-compose.dev.yml up -d --wait

3. Duplicate the .sample-env file and make changes to the passwords and destinations.

4. Run prisma migrate to start up the database with default tables and call the migration init
    ```bash
    npx prisma migrate dev

### Endpoints

All endpoints except those under the *AUTH(POST)* check to make sure that the task is associated with the logged in user. If the user isn't logged in then the API will respond with an error: *This user does not have a task with this id: (Num)*, or *This user is not authorized to make changes to this task*

#### AUTH(POST):
- [x] **uri/auth/signup** - Post valid data requirements in the body of the request, and you should receive back a token for future requests.
    - Requirements
        - fname : string
        - lname : string
        - email : string (Valid email)
        - password : string (Valid password)
- [x] **uri/auth/login** - Checks the database for a user associated with the email and then checks the password matches the hashed pass on the database.
    - Requirements
        - email : string (Valid email)
        - password : string (Valid password)

#### GET:
- [x] **uri/task/** - Get all tasks from the database associated with the user.
- [x] **uri/task/:id** - Get a single task denoted by the id from the database associated with the user.

#### POST:
- [x] **uri/task/** - Create a Task and store it to the database associated with the user.

#### PUT:
- [x] **uri/task/:id** - Update a task denoted by the id from the database associated with the user.
- [x] **uri/task/toggle/:id** - Toggle the complete boolean in the task row denoted by the id from the database associated with the user

#### DELETE:
- [x] **uri/task/:id** - Delete a task from the database denoted by the id and associated with the user.


