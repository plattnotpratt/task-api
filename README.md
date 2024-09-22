# ToDo List API

A simple and easy-to-use REST API for managing a ToDo List application. This API allows users to perform CRUD operations (Create, Read, Update, Delete) on tasks.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Create Tasks**: Add new tasks to the ToDo list.
- **View Tasks**: Retrieve a list of tasks or a specific task by ID.
- **Update Tasks**: Modify existing tasks (e.g., mark them as completed).
- **Delete Tasks**: Remove tasks from the list.

## Tech Stack

- **Backend**: Node.js (Express) 
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger
- **Testing**: Mocha/Chai (Node)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- MySQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/todo-list-api.git

### Endpoints

All endpoints check to make sure that the task is associated with the logged in user. If the user isn't logged in then the API will respond with an error: *There is no task with that id associated with your user account*.


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
