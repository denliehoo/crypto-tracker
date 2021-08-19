# crypto tracker project

This project aims to help people track their cryptocurrency portfolio.
This is a full-stack MERN project written in TypeScript.

# Todo Log

## Do a landing page

## Use MongoDB realm for user authentication instead of firebase

Rationale being that I don't want to have 2 separate databases

## Create an overview page

Should be created using MONGODB realm and consist graph / charts of a breakdown of the user portfolio

# Change Log

## 19 Aug 2021 - Added .env for client

Added a .env file which contains the firebase this in the client file
Also started using the README.md file
Updated the .gitignore file to exclude the .env file for client folder

## 19 Aug 2021 - Passed props through Link Component for Edit Page

Was previously passing the details through the url for the edit page. Changed it to pass through with props

## 18 Aug 2021 - First commit

# Installation & Instructions

## 1. Download files

## 2. cd server and npm install

## 3. cd client and npm install

## 4. Within the server directory, create a nodemon.json folder in the following format: [change user and password accordingly to you MongoDB atlas account]

{
"env": {
"MONGO_USER": "yourUserName",
"MONGO_PASSWORD": "yourPassword",
"MONGO_DB": "cryptotracker"
}
}

## 5. Within the client directory, create a .env file in the following format:

REACT_APP_FIREBASE_KEY= yourFirebaseKey

## 6. npm start (on both client and server)
