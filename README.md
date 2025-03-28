# EmployWise User Management Application

## Project Overview
This is a React-based user management application that integrates with the Reqres API to provide authentication, user listing, editing, and deletion functionalities.

## Features
- User Authentication
- Paginated User List
- User Edit and Delete Functionality
- Responsive Design
- Token-based Authentication

## Prerequisites
- Node.js (v14 or later)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/employwise-app.git
cd employwise-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

## Technologies Used
- React
- React Router
- Axios
- Tailwind CSS
- Reqres API

## API Endpoints Used
- POST /api/login
- GET /api/users
- PUT /api/users/{id}
- DELETE /api/users/{id}

## Authentication
- Default Credentials:
  - Email: eve.holt@reqres.in
  - Password: cityslicka

## Assumptions and Considerations
- Token is stored in localStorage
- Redirect to login if token is missing
- Basic error handling implemented
- Responsive design using Tailwind CSS

## Bonus Features Implemented
- React Router for navigation
- Pagination for user list
- Edit and Delete user functionality

## Future Improvements
- More robust error handling
- Add client-side search/filtering
- Implement refresh token mechanism

## License
MIT License
