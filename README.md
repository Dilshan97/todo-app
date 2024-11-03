

## A Simple REST API for Todo App

This repository includes the REST API for simple Todo App. This project handles CRUD operations for todo management, including creating, retrieving, updating, and deleting todo records and User Authentication including Register a new user and login user functions.

The backend is build on **NodeJS** with **express** and **mongoDB**.


#### How to setup the backend project

- Install the dependencies by running `npm install`

- Create a new database cluster by using mongoDB Atlas & add `database cluster URL`, `username` and `password` into .env file.

- Completing the configurations, To run the server application by running `npm run dev` in developer mode.

- To run unit tests by running `npm run test` in test mode.

### Backend API Endpoints

| Method | Endpoint | Description                         |
|-|--|-------------------------------------|
| GET | /api/ping | Health check endpoint               |
| POST |/user/login| Login endpoint                      |
| POST |/user/logout| Logout endpoint                     |
 | | |                                     |
| GET | /api/todo | List all todos.                     |
| POST | /api/todo | Add a new todo.                     |
| PUT | /api/todo/:id | Update an existing todo by todo id. |
| DELETE | /api/todo/:id | Delete an existing todo by todo id. |

API Documentation - Please check the **docs** directory for full API documentation
