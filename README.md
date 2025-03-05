# Category Management API

This project is a Node.js-based API for managing categories, allowing users to perform CRUD operations on categories.

## Features

- User authentication with JWT
- CRUD operations for categories
- Protected routes for category management

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Jest (for testing)

## Installation

### Clone the repository
```bash
git clone https://github.com/yourusername/Anglara-Test.git
```

### Navigate to the project directory
```bash
cd Anglara-Test
```

### Install dependencies
```bash
npm install
```

## Configuration

Create a `.env` file in the root directory and add:

```env
PORT
MONGODB_URI
JWT_SECRET
```

Replace `your_jwt_secret` with a secure secret key.

## Running the Application

### Start the server
```bash
npm start
```

The API will be accessible at `http://localhost:3000`.

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Authenticate a user and retrieve a JWT

### Categories (Protected Routes, Require JWT)
- **GET** `/api/categories` - Retrieve all categories
- **POST** `/api/categories` - Create a new category
- **GET** `/api/categories/:id` - Retrieve a category by ID
- **PUT** `/api/categories/:id` - Update a category by ID
- **DELETE** `/api/categories/:id` - Delete a category by ID

## Testing

### Run tests
```bash
npm test
```

This will execute Jest-based tests inside the `tests` directory.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes.
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.

