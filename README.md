# Simple Blogger App Capstone Backend

Welcome to the README for the Simple Blogger App Capstone Backend. This document provides an overview of the backend application, including how to set it up, run it, and other essential information.

This backend is live and deployed at [https://simplebloggerapp.onrender.com](https://simplebloggerapp.onrender.com). The source code is hosted on GitHub at [https://github.com/anandhakumarmca/simplebloggerapp-backend.git](https://github.com/anandhakumarmca/simplebloggerapp-backend.git).

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Simple Blogger App Capstone Backend is the server-side component of a blogging application. It provides RESTful APIs to manage blog posts, user authentication, and other essential functions. It is built using Node.js, Express.js, and MongoDB.

## Prerequisites

Before you can run the Simple Blogger App Capstone Backend, you need to have the following prerequisites:

- Node.js (v14 or higher): [Installation Guide](https://nodejs.org/)
- NPM (Node Package Manager): Included with Node.js
- MongoDB: [Installation Guide](https://docs.mongodb.com/manual/installation/)

## Getting Started

To get started with the backend, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/anandhakumarmca/simplebloggerapp-backend.git
   
## Setting Up the Project

1. **Navigate to the project directory:**

    ```bash
    cd simplebloggerapp-backend
    ```

2. **Install the project dependencies:**

    ```bash
    npm install
    ```

## Project Structure

The project directory follows this structure:

- **app.js**: The main application entry point.
- **routes/**: Directory containing route definitions.
- **controllers/**: Directory for handling business logic.
- **models/**: Directory for defining database models using Mongoose.
- ...

## Environment Variables

The backend relies on environment variables to work correctly. Please make sure to set the following environment variables before running the application:

- **PORT**: The port on which the server will listen.
- **MONGODB_URI**: The URI to your MongoDB database.
- **JWT_SECRET**: Secret key for JSON Web Token (JWT) authentication.

Make sure to define these variables appropriately for your environment to ensure the proper functioning of the application.

## Deployment

The backend for the Simple Blogger App Capstone project is live and deployed at [https://simplebloggerapp.onrender.com](https://simplebloggerapp.onrender.com).

## API Documentation

You can find detailed API documentation for the backend on Postman. Please refer to the [API Documentation](https://documenter.getpostman.com/view/593035/2s9YXe8jZd) for comprehensive information on the available API endpoints and usage.

**Note**: Ensure that the backend is running and accessible before using the provided API documentation.
