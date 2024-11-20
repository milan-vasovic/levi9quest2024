# levi9quest2024
## Project Documentation ##
### Introduction ###
This project is a Node.js application designed to handle players and teams using APIs. It includes validation mechanisms, test scripts for functionality, and uses modern libraries to ensure robust development and testing.

## Technologies Used ##
- **1. Node.js**
A runtime environment that executes JavaScript code server-side.
- **2. Express.js**
A web application framework for Node.js, used for creating APIs and handling routing.
- **3. JavaScript**
The core programming language used for development.
- **4. Express-validator**
A library used for validating and sanitizing input data in APIs.
- **5. Chai**
An assertion library for testing, providing various styles of assertions such as expect.
- **6. Chai-http**
A plugin for Chai that simplifies HTTP request testing.
- **7. Mocha**
A test framework for running tests, handling asynchronous code, and providing detailed reports.
- **8. UUID**
A library for generating unique identifiers for players and teams.

## Getting Started ##
- **1. Clone the Repository**
To download the project from GitHub, run the following command:
  - **git clone https://github.com/milan-vasovic/levi9quest2024.git**

- **2. Navigate to the Project Directory**
Move to the project directory using:
  - **cd <project_directory>**

### Install Dependencies ###
Before running the project, install all necessary dependencies:
  - **npm install**
This will install all the libraries listed in package.json.

## Running the Server ##
### 1. Start the Server ###
To start the server, use:
  - **npm start**
By default, the server will run on port 8080.

### 2. Stop the Server ###
To stop the server, press **CTRL+C** in the terminal where the server is running.

## Running Tests ##
### 1. Run Test Scripts ###
The project includes a suite of tests written in Mocha and Chai. To run the tests, execute:
  - **npm test**

### 2. What the Tests Do ###
Validate API inputs (e.g., missing or invalid data).
Test functionality such as creating players, validating unique nicknames, and team operations.
Ensure expected API responses, including status codes and error messages.

**Shutting Down**
### 1. Stop the Server or Tests ###
To stop a running test suite, press **CTRL+C** in the terminal.

### 2. Clean Up ###
Ensure no unnecessary processes are left running on your local machine.
