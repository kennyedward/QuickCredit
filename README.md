# QuickCredit
[![Build Status](https://travis-ci.org/kennyedward/QuickCredit.svg?branch=develop)](https://travis-ci.org/kennyedward/QuickCredit) [![Coverage Status](https://coveralls.io/repos/github/kennyedward/QuickCredit/badge.svg)](https://coveralls.io/github/kennyedward/QuickCredit)
[![Maintainability](https://api.codeclimate.com/v1/badges/3051ce937ea013c459e7/maintainability)](https://codeclimate.com/github/kennyedward/QuickCredit/maintainability)

Quick Credit is an online lending platform that provides short term soft loans to individuals.  [Get Started](https://kennyedward.github.io/QuickCredit/)

To access the Admin dashboard. Click [here](https://kennyedward.github.io/QuickCredit/admin-verify-account.html)
> **Note**: This project is currently under development. It will be updated on a regular basis.

## Getting Started

This project is built with HTML, CSS, JavaScript and Nodejs (Express framework) for the API endpoints. It was written in JavaScript ES6.

## Prerequisites

- You should have [Node](https://nodejs.org/en/) installed on your local machine.
- You should have [Git](https://git-scm.com/) installed on your machine to clone the project 
- You also need to create a ```.env``` file in the project root folder.

```
APP_TOKEN=add_app_token_key
ADMIN_PASS=add_admin_password
PORT=7000
```

## Installing

- Clone the repo: ```git clone https://github.com/kennyedward/QuickCredit.git ```
- Change directory into the QucikCredit folder: ``` cd QuickCredit```
- Install dependencies: ```npm install``` or ```yarn install```
- Start the server: ```npm run dev```
- Navigate to [localhost:7000/api/v1](localhost:7000/api/v1) in your browser to view the running application
- You should see a ```json``` response in the browser or in [Postman](https://www.getpostman.com/)
```
{
    "status": 200,
    "message": "You're welcome to index API Endpoint"
}
```

## Development

Run: ```npm run dev``` at the terminal  to use [Nodemon](https://nodemon.io/) and [Babel](https://babeljs.io/).

[Nodemon](https://nodemon.io/): monitors files changes and automatically restarts server.

[Babel](https://babeljs.io/): transpiles ES6 to a compactible environment version.

## Runing the tests
- To test with [Mocha](https://mochajs.org/): Run ```npm test``` at the terminal
- To test with [Postman](https://www.getpostman.com/), navigate to [localhost:7000/api/v1](localhost:7000/api/v1) by testing each of the endpoints listed below.
- Note that all endpoints except signup and login requires a valid **Token** which caan be gotten at *login* point.
- **SET** ```key: Authorization, Content-Type: Bearer <token>``` on all endpoints except *signup* and *login*


## API Routes

#### User
- Sign up user: **POST**: ```localhost:7000/api/v1/auth/signup ```

- Login user: **POST**: ```localhost:7000/api/v1/auth/login ```

- Apply for Loan: **POST**: ```localhost:7000/api/v1/loans ```

- View Loan Repayment History: **GET**: ```localhost:7000/api/v1/:loanId/repayments ```

#### Admin

- Login: **POST**: ```localhost:7000/api/v1/auth/login ```

- Verify registered user: **PATCH**: ```localhost:7000/api/v1/users/:userEmail/verify ```

- Approves or Reject Loan Application: **PATCH**: ```localhost:7000/api/v1/loans/:loanId ```

- View All Loan Application: **GET**: ```localhost:7000/api/v1/loans/ ```

- View a Single Loan Application: **GET**: ```localhost:7000/api/v1/loans/:loanId ```

- Post Loan Repayment transaction: **POST**: ```localhost:7000/api/v1/loans/:loanId/repayment ```

- View All Repaid Loan Application: **GET**: ```localhost:7000/api/v1/loans/?status=approved&repaid=true ```

- View All Current Loan Application: **GET**: ```localhost:7000/api/v1/loans/?status=approved&repaid=false ```


## App URL
The API endpoints is hosted on [heroku](https://quickcredit-heroku.herokuapp.com/api/v1/)

## Built With

#### Server
- [Node js](https://nodejs.org/en/) - A JavaScript runtime 
- [Express](https://expressjs.com/) - A web framework for Node.js
- [Babel](https://babeljs.io/) - A JavaScript compiler.

### Tests
- [Mocha](https://mochajs.org/) - JavaScript test framework running on Node.js
- [Chai](https://www.chaijs.com/) - A BDD / TDD assertion library for node

#### UI
- HTML
- CSS
- JavaSCript

## Documentation
The API Endpoint documentation can be found [here](https://quickcredit-heroku.herokuapp.com/api/v1/api-doc)


## Author

[Kehinde Edward](https://github.com/kennyedward)
