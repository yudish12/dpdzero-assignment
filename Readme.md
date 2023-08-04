# Ddp Zero Project(Nodejs,Express,Postgres,Sequelize ORM)

## Why nodejs and express

I have used nodejs,express for this project as creating api routes,middlewares,error handling  
is really easy according to assignment simple error handling middleware could be created and
error codes could be defined if you use express and it is really fast and backend/api's  
created with node and express are highly scalable and comes with lots of npm packages

## Why postgreSQL and Sequelize

PostgreSQL is a powerful and versatile relational database. It supports a wide range of features, including ACID transactions,  
foreign keys, and JSON data types. This makes it a good choice for a variety of applications, including web applications,  
data warehouses, and real-time systems.

Sequelize is a well-maintained and widely-used ORM for PostgreSQL. It provides a simple and intuitive API for interacting  
with the database, which can save developers a lot of time and effort. Sequelize also supports a number of advanced features,  
such as relations, migrations, and caching.

The combination of PostgreSQL and Sequelize is scalable and reliable. PostgreSQL is known for its scalability and performance,  
and Sequelize provides a number of features to help developers build reliable applications. For example,  
Sequelize supports transactions, which can help to prevent data corruption.

## DB Schema

### User Schema Documentation

Here I will be explaining how i created User model for this assignment so that it has proper fields and validations on them

Table: users
The "users" table represents user data in the application. Each row in the table represents a user with various attributes like their full name, username, password, email, age, and gender.

Columns
id (Primary Key): An auto-incremented integer value that serves as the unique identifier for each user record.

full_name: A non-null string representing the user's full name. This attribute is required and must be provided during user registration.

username: A non-null string representing the user's username. This attribute is required and must be unique for each user. If a provided username already exists in the database, the user registration will fail with a specific error message: "The provided username is already taken. Please choose a different username."

password: A non-null string representing the user's password. This attribute is required and must follow certain password requirements. The password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters (e.g., !@#$%^&\*). If the password provided during registration does not meet these criteria, the registration will fail with the error message: "Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters."

email: A non-null string representing the user's email address. This attribute is required and must be unique for each user. If a provided email already exists in the database, the user registration will fail with the error message: "The provided email is already registered. Please use a different email address." The email address provided during registration must also be a valid email format (e.g., user@example.com).

age: A non-null integer representing the user's age. This attribute is required and must be a positive number. If a non-positive value (0 or negative) is provided for age during registration, the process will fail with the error message: "Invalid age value. Age must be a positive number."

gender: A non-null string representing the user's gender. This attribute is required, and it cannot be empty or null. During registration, users must specify their gender (e.g., male, female, non-binary). If no gender is specified during registration, the process will fail with the error message: "Gender field is required. Please specify the gender (e.g., male, female, non-binary)."

Additional Information
The timestamps option is set to true. This means Sequelize will automatically create two additional columns in the "users" table: createdAt and updatedAt. These columns will record the timestamp when a user record is created or updated, respectively.

The freezeTableName option is set to true. This prevents Sequelize from automatically pluralizing the table name ("users" in this case) and using it as the table name in the database. The table name will remain "users" exactly as specified in the schema.

Important Notes
Make sure to set up a Sequelize instance (db) correctly, pointing to your database configuration.

This schema implements certain constraints to ensure data integrity and security. Ensure that you handle validation errors appropriately during user registration and account management.

Always hash passwords before storing them in the database to enhance security.

The provided code snippet is written in JavaScript and requires Sequelize and database configurations to work correctly. Make sure to import the necessary modules and set up the database connection before defining the schema.

---

### Data Schema Documentation

Here I will be explaining how i created Data model for this assignment so that it has proper fields and validations on them  
with proper types on key value pairs to be stored in database

Table: data
The "data" table stores key-value pairs representing data entries.

Columns
id (Primary Key): An auto-incremented integer serving as the unique identifier for each data entry.

key: A non-null string representing the data entry's key. This attribute is required and must be unique. If a provided key already exists in the database, the insertion will fail with the message: "The provided key is already taken. Please choose a different key."

value: A string representing the value associated with the key.

Additional Information
Automatic timestamps (createdAt, updatedAt) are included.

The table name is set to "data."

Ensure proper database configuration and handle potential key uniqueness violations during data insertion.

Use this as a reference while implementing the Data schema in your application. Customize the schema to suit your specific requirements. Happy coding!

## Requirements

For development, you will only need Node.js installed on your system,a node package manager NPM and
postgreSQL installed with username and Password.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Install and Run Code

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd server
    $ npm install
    $ create a .env file in server folder with following variables and value (not description)

      | Variable     | Value      | Description                        |
      |--------------|------------|------------------------------------|
      | DB_USERNAME  | postgres   | Database username                  |
      | DB_PASSWORD  | yudi1234   | Database password                  |
      | JWT_SECRET   | secret123  | Secret key for JSON Web Tokens     |

    $ node index.js to start server in your terminal
    $ go to postman and now use api routes to send requests

### How to add token in postman

    1) Use /token api for generating token
    2) now copy this token and just add it to the data collection-> authorization
       ->Bearer Token-> add the token generated
    3) ([Link for postman workspace and collections](https://www.postman.com/gold-flare-783332/workspace/dpd-zero-assignment/overview))
