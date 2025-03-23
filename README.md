# Note-Taking API

This is a simple **Note-Taking API** built with _Node.js_, _Express.js_, _TypeScript_, and _MongoDB Atlas_. This API allows you perform CRUD operations such as create, read, update, and delete notes. Users can register, log in, create, read, update, and delete notes. Notes are directly associated with specific users and categories. 

---

## Features

- _Create a Note_: Add a new note with a title and content.
- _Get All Notes_: Retrieve a list of all created notes.
- _Get a Single Note_: Fetch a specific note by its ID.
- _Update a Note_: Modify the title or content of an existing note.
- _Delete a Note_: Remove a note from the database.
- Featch notes by Category
- **Custom Middleware** for:
1. Validation (with no external library)
2. Logging Requests (track API requests and log them)
- TypeScript with strong typing
- MongoDB Database with mongoose
- _User Authentication_: Register new users, log in and retrieve a JWT token to authenticate requests and secure access to endpoints
- TypeScript's type safety helps for safety and better developer experience

---

## Technologies Used

- _Node.js_: A runtime environment for executing JavaScript on the server.
- _Express.js_: A web framework for building APIs.
- _TypeScript_: A typed superset of JavaScript for better code quality.
- _MongoDB Atlas_: A cloud-based NoSQL database for storing notes.
- _Mongoose_: An ODM (Object Data Modeling) library for MongoDB.
- _bcrypt_: library for hashing password
- _jsonwebtoken_: library for generating and verifying JWT tokens

---

## Getting Started

### Prerequisites

1. Node.js (v16 or higher)
2. npm (v8 or higher)
3. MongoDB (local instance or MongoDB Atlas)


### Clone this Repository

```bash
git clone https://github.com/Khalifa-pendrops/authentication.git
cd note

```

### Install Dependencies

```bash
npm install

```

### Set Up Environment Variables

Create a .env file in the root directory and add your MongoDB Atlas connection string:

```env

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.juxuh.mongodb.net/<database>?retryWrites=true&w=majority

```

- Replace **username**, **password**, and **database** with your MongoDB Atlas credentials (username, password and DB name).

### Compile TypeScript

```bash
tsc
npm run build or node dist/index.js <replace with your file name>

```

### 5. Start the Server

```bash
npm run dev

```

The server will start on http://localhost:5000 unless the index.js file has been reconfigured to change port number.

---

## API Endpoints

### Authentication

#### Register a New User

- URL: /auth/register

_Method_: POST

Request Body:

json

```
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}

```
Response:

json

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

```

#### Log In

- URL: /auth/login

_Method_: POST

Request Body:

json

```
{
  "username": "testuser",
  "password": "password123"
}

```
Response:

json

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

```

### Notes

#### Create a Note

- URL: /notes

_Method_: POST

Headers:


Authorization: Bearer <JWT_TOKEN>
Request Body:

json

```
{
  "title": "My First Note",
  "content": "This is a test note.",
  "categoryId": "64f1b2c3e4b0f5a3d4e5f6b8"
}

```
Response:

json

```
{
  "success": true,
  "message": "Note created successfully!",
  "data": {
    "_id": "64f1b2c3e4b0f5a3d4e5f6a7",
    "title": "My First Note",
    "content": "This is a test note.",
    "category": "64f1b2c3e4b0f5a3d4e5f6b8",
    "user": "64f1b2c3e4b0f5a3d4e5f6a7",
    "createdAt": "2023-09-01T12:00:00.000Z",
    "updatedAt": "2023-09-01T12:00:00.000Z"
  }
}

```

### Get All Notes

- URL: /notes

_Method_: GET

Headers:

Authorization: Bearer <JWT_TOKEN>

Response:

json

```
{
  "success": true,
  "message": "Notes fetched successfully",
  "data": [
    {
      "_id": "64f1b2c3e4b0f5a3d4e5f6a7",
      "title": "My First Note",
      "content": "This is a test note.",
      "category": "64f1b2c3e4b0f5a3d4e5f6b8",
      "user": "64f1b2c3e4b0f5a3d4e5f6a7",
      "createdAt": "2023-09-01T12:00:00.000Z",
      "updatedAt": "2023-09-01T12:00:00.000Z"
    }
  ]
}

```
#### Get a Note by ID

- URL: /notes/:id

_Method_: GET

Headers:


Authorization: Bearer <JWT_TOKEN>

Response:

json

```
{
  "success": true,
  "message": "Note fetched successfully",
  "data": {
    "_id": "64f1b2c3e4b0f5a3d4e5f6a7",
    "title": "My First Note",
    "content": "This is a test note.",
    "category": "64f1b2c3e4b0f5a3d4e5f6b8",
    "user": "64f1b2c3e4b0f5a3d4e5f6a7",
    "createdAt": "2023-09-01T12:00:00.000Z",
    "updatedAt": "2023-09-01T12:00:00.000Z"
  }
}

```

### Update a Note

- URL: /notes/:id

_Method_: PUT

Headers:

Authorization: Bearer <JWT_TOKEN>

Request Body:

json

```
{
  "title": "Updated Note Title",
  "content": "Updated note content.",
  "categoryId": "64f1b2c3e4b0f5a3d4e5f6b8"
}

```
Response:

json

```
{
  "success": true,
  "message": "Note updated successfully",
  "data": {
    "_id": "64f1b2c3e4b0f5a3d4e5f6a7",
    "title": "Updated Note Title",
    "content": "Updated note content.",
    "category": "64f1b2c3e4b0f5a3d4e5f6b8",
    "user": "64f1b2c3e4b0f5a3d4e5f6a7",
    "createdAt": "2023-09-01T12:00:00.000Z",
    "updatedAt": "2023-09-01T12:00:00.000Z"
  }
}

```

### Delete a Note

- URL: /notes/:id

_Method_: DELETE

Headers:

Authorization: Bearer <JWT_TOKEN>

Response:

json

```
{
  "success": true,
  "message": "Note deleted successfully",
  "data": {
    "_id": "64f1b2c3e4b0f5a3d4e5f6a7",
    "title": "My First Note",
    "content": "This is a test note.",
    "category": "64f1b2c3e4b0f5a3d4e5f6b8",
    "user": "64f1b2c3e4b0f5a3d4e5f6a7",
    "createdAt": "2023-09-01T12:00:00.000Z",
    "updatedAt": "2023-09-01T12:00:00.000Z"
  }
}

```

### Get Notes by Category ID

- URL: /notes/categories/:categoryId

_Method_: GET

Headers:

Authorization: Bearer <JWT_TOKEN>

Response:

json

```
{
  "success": true,
  "message": "Notes fetched by category successfully",
  "data": [
    {
      "_id": "64f1b2c3e4b0f5a3d4e5f6a7",
      "title": "My First Note",
      "content": "This is a test note.",
      "category": "64f1b2c3e4b0f5a3d4e5f6b8",
      "user": "64f1b2c3e4b0f5a3d4e5f6a7",
      "createdAt": "2023-09-01T12:00:00.000Z",
      "updatedAt": "2023-09-01T12:00:00.000Z"
    }
  ]
}

```

## Contributing

If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeatureName).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/YourFeatureName).
5. Open a pull request.

---

