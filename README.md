# Poll App
## Overview
The Poll App is a web application built using a modern tech stack to create, manage, and participate in polls. This README provides an overview of the application, its installation, and usage.

## Stack
* Frontend: Not included in this repository (client-side application)
* Backend: Node.js with Express.js
* Database: MongoDB
* Deployment: Docker

## Installation
To install the application, follow these steps:
1. Clone the repository using `git clone`.
2. Install dependencies using `npm install`.
3. Create a `.env` file and add your MongoDB URI as `MONGO_URI`.
4. Start the application using `npm start`.

## Docker
To run the application using Docker, follow these steps:
1. Build the Docker image using `docker build -t poll-app .`.
2. Run the Docker container using `docker run -p 5000:5000 poll-app`.

## Endpoints
The application exposes the following endpoints:
### Authentication
* **POST /api/auth/register**: Register a new user
* **POST /api/auth/login**: Login user

### Polls
* **GET /api/polls**: List polls (authenticated users only)
* **POST /api/polls**: Create poll (authenticated users only)
* **GET /api/polls/:id**: Get poll by ID (authenticated users only)
* **PUT /api/polls/:id**: Update poll (authenticated users only)
* **DELETE /api/polls/:id**: Delete poll (authenticated users only)
* **POST /api/polls/:id/vote**: Vote in poll (authenticated users only)
* **GET /api/polls/:id/results**: Get poll results (authenticated users only)

## Main Model
The main model for this application is the `Poll` model, which has the following fields:
* `question: String`
* `options: Array`
* `votes: Object`

## Security
The application prioritizes security with the following measures:
* **Authentication**: All endpoints (except registration and login) require authentication using JSON Web Tokens (JWT).
* **Authorization**: Only authenticated users can access and modify poll data.
* **Data Encryption**: Sensitive data, such as user passwords, is encrypted using bcrypt.
* **Input Validation**: All user input is validated to prevent common web attacks, such as SQL injection and cross-site scripting (XSS).
* **Error Handling**: Errors are handled and logged to prevent information disclosure and ensure application stability.
* **Dependencies**: Dependencies are kept up-to-date to prevent known vulnerabilities.