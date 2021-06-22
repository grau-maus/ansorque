# Welcome to Ansorque!

Hi! Welcome to Ansorque it is a blogging App where the users can ask and answer any questions about life. From the most philosophical questions and answer to the most random and short anecdote it is all recorded and render in Ansorque. 

Click the Image below to go the website:

[<a href="https://ansorque.herokuapp.com/"><img src="https://i.ibb.co/PrRt8WH/Screen-Shot-2021-06-21-at-11-42-33-PM.png" alt="Screen-Shot-2021-06-21-at-11-42-33-PM" border="0"></a>](https://ansorque.herokuapp.com/)

[Git Hub Repo Link](https://github.com/grau-maus/ansorque)

## Wiki-links

[MVP Feature List]()
[Database Schema]()
[Frontend Routes]()
[API Documentation]()

## To-Do 

### Functional Goals

1.  Build a fully functional blogging Application using JS, React, Redux,  CSS and PostgreSQL.

### Minimum Functional Goals

1.  Implement custom user authentication using BCrypt library.
2.  Allow users to create an account and multiple thread pages for questions.
3.  Let users post questions
4.  Allow users to search for questions.
5. Allow users to answer questions

### Stretch Functinoal Goals

1.  Implement a more efficient / direct search using regular expressions and be able to search for answer as well.
2. Polymophic Up/Down Votes: For Questions, and Answers
3. User Profile and Page

# Primary Pages and Features

## Home page/Sign-up/Log-in

<a href="https://ibb.co/9N87TrX"><img src="https://i.ibb.co/Xb2qsCB/Screen-Shot-2021-06-21-at-11-09-07-PM.png" alt="Screen-Shot-2021-06-21-at-11-09-07-PM" border="0"></a>

This is the page that our visitors will first see, from here log in or sign-up

### Sign-up
 It is where our visitors can become one of Ansorque users. By entering the necessary required information and after that will be automatically log-in. 

### Log-in
Our visitors can log-in with our "Demo Log in" to be able to try out sites full features without having to register.  But on this section you can enter you own log-in information to access the application and all its features. 
   

## Main Page 

After signing in or loging in you will be brought to this page...

To the Most recent Activity Page:

<a href="https://ibb.co/tHnKRmC"><img src="https://i.ibb.co/kGzBZHc/Screen-Shot-2021-06-21-at-11-26-28-PM.png" alt="Screen-Shot-2021-06-21-at-11-26-28-PM" border="0"></a>

On this page you can as a user you can post a question and also see the most recently answer question, in which you if the question fascinates you can click on that question and a post an answer of your own. 

<a href="https://ibb.co/xX2FkTr"><img src="https://i.ibb.co/vVcXFnM/Screen-Shot-2021-06-21-at-11-40-07-PM.png" alt="Screen-Shot-2021-06-21-at-11-40-07-PM" border="0"></a> 

As you browse you can press "more" to see more answered questions.

### clicking on one of those questions... Brings you to this page:

## Question and Answer Page
<a href="https://ibb.co/qFsGk4c"><img src="https://i.ibb.co/VpSy2hz/Screen-Shot-2021-06-21-at-11-28-46-PM.png" alt="Screen-Shot-2021-06-21-at-11-28-46-PM" border="0"></a>

This is where you can see other answer to the question selected and navigated to. This is the page where you can also post your own answer to the question. 

## Searching Result Page

<a href="https://ibb.co/Yc0L9pW"><img src="https://i.ibb.co/qNJrGkn/Screen-Shot-2021-06-21-at-11-35-12-PM.png" alt="Screen-Shot-2021-06-21-at-11-35-12-PM" border="0"></a>

This is is seen when you put a search word or letter on the search bar and all the corresponding thread question will be seen based on the entered word/letters. 


# Having a copy of the Project on your own Local Machines


First go to the [Git Hub Repo Link](https://github.com/grau-maus/ansorque) and fork it to your own repository or you can clone it in any directory of your choice just make sure to `cd` to that directory and then run command below:

`git clone https://github.com/grau-maus/ansorque.git`

After than lunch your terminal/ubuntu and go the project directory  `cd ansorque` .

After going to project directory you can do a`cd backend` then you can do a  `npm install`  and then `cd to frontend` then do another `npm install` to get the dependencies for this project or you can lunch vscode from the terminal while being on the directory by using command `code .` in the terminal. Then open the terminal from the vs code while on the main directory you can `cd to backend`  and you can use `npm install` to get the dependencies and do the same thing to the `frontend` by `cd frontend`  then `npm install`.

On the `backend` direction create a file called `.env` here you can use the file called `.env.example` and copy all the contents in that file and copy in your `.env`file that you just created or you can copy and paste the code below to set up your .env(environment):

`PORT=5000`
`DB_USERNAME=anosorque_app`
`DB_PASSWORD=password(any)`
`DB_DATABASE=anosorque_db`
`DB_HOST=localhost`
`JWT_SECRET=(any)`
`JWT_EXPIRES_IN=604800`

Or you can see `.env.example` file for details

`CREATE DB ansorque_db WITH OWNER ansorque_app;

After that go to your terminal and utilize command `psql` to lunch your Psql and create a user name `ansorque_app` with password `password (this can be any just make sure to put as the value in DB_PASSWORD)` and have "createdb" privilege. 

Enter command in your psql.

    CREATE USER ansorque_app WITH PASSWORD "password" CREATEDB;
    

After creation of the user entering the command enter the following commands via terminal:

	CREATE DB ansorque_db WITH OWNER ansorque_app;

To create the database for the application. 

Then do run the following commands...

    `npx dotenv sequelize db:create`
    
  Then we need to migrate database...

    npx dotenv sequelize db:migrate

After that we can seed the tables with the test cases and initial entry values.

    npx dotenv sequelize db:seed:all

If successful and error free then your database for the project should be set up. Good Job!

You can now just put in the command in your terminal `cd backend` and then do a `npm start`, following `cd frontend` and `npm start`  to launch nodemon leave that running in the vs-code after you `npm start` in the frontend directory your default browser should open a window/tab to the application - courtesy of react then enjoy using the application in you local machine. 


## How to Use Ansorque:

1.  Go to  [https://ansorque.herokuapp.com/](https://ansorque.herokuapp.com/)
2.  Log in quickly with the Demo User or create a new account using the Sign-up Form.
3.  Search existing Question or create a new Question thread and posts of your own!
4. Bestow some of your thoughts about the question that intrigue you and post an answer corresponding to that question.

```
No special instructions, the Application is fully functional!
```

# Overall Structure
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white%22%3E" /> <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white%22/%3E" /> <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white%22%3E" />






#### Back end

The backend of the application was build using PostgreSQL for my relational database and to manage my data. I used Sequelize to interact with PostgreSQL. Using Express.js web framework for routes, and RESTful Apis. Together they provide a back-end API service to the Front-end server.

#### Front end

The front end is built completely using React.js and Redux.js.

#### Libraries

Ansorque uses:

- [BCrypt](https://github.com/codahale/bcrypt-ruby)  for authorization
- [Node modules](https://github.com/node-modules) for many dependencies and functionality
- [Express js](https://github.com/expressjs/express) for web framework
- [Morgan](https://github.com/expressjs/morgan) for the http logger middleware for node.js
- [http-errors](https://github.com/jshttp/http-errors) create errors and be able to display them with ease
- [cookie-parser](https://github.com/js-cookie/js-cookie) for cookie parsing in use of cookie storage
- [Sequelize](https://github.com/sequelize/sequelize) for interacting with the SQL database. 
- [Faker](https://www.npmjs.com/package/faker) for some seeder data

# Challenges

`code snippet of the challenge` 

//How you solved the challenge

//link the files where the solution occurred from your actual repo. 

# Future Features 

- "Contact Us" or "About Us" Section 
-  Implement a more efficient / direct search using regular expressions and be able to search for answer as well.
- Polymophic Up/Down Votes: For Questions, Answers, Comments.
- A robust and detailed User Page.
- Change the "more" Botton feature on the main page to infinite scrolling.

### Creators/Project

This project was created with-in a week, in the span of March 25th to April 1st  in the year of 2021. Two days of planning and we had five to six days of coding and creating the application.

This project was develop by the following Dev:
[Josh Tupas](https://github.com/grau-maus)




