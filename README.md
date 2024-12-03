# Real-time chat (Backend)

This is a backend project for a system based on **Node.js** and **TypeScript**. It uses **Apollo Server** for GraphQL, **Express** for API creation, and tools like **Mongoose** for interaction with MongoDB. It also incorporates tools like **ESLint**, **Prettier**, **Husky**, and **Lint-Staged** for code quality control.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime environment.
- **TypeScript**: JavaScript superset that adds static typing.
- **Express**: Web framework for Node.js.
- **Apollo Server**: Framework for implementing a GraphQL server.
- **GraphQL**: API query language.
- **Mongoose**: ODM library for MongoDB.
   
## Installation

1.- Clone the repository
```bash
  git clone https://github.com/{yourUser}/backend-chat-graphql.git
```
2.- Navigate to the project folder
```bash
cd backend-chat-graphql
 ``` 
3.- Install dependencies
```bash
yarn
 ```    

 ## Project Execution

To run the project, run the following command

```bash
  yarn dev
```

## Environment Variables

Make sure to set the following environment variables in a `.env` file:

- **MONGODB_URI**: The URI of your MongoDB database.
- **PORT**: The port where the server should run.