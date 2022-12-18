const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

// ROUTES:----------------------------------------------------------
const routes = require('./routes');
// ROUTES:----------------------------------------------------------




// 'isProduction' WILL BE 'true' IF CHECK PASSES BY CHECKING THE ENVIRONMENT KEY WITHIN './backend/config/index.js'
const { environment } = require('./config');
const isProduction = environment === 'production';

// INITIALIZE THE EXPRESS APP
const app = express();

// CONNECT 'morgan' MIDDLEWARE FOR LOGGING INFO ABOUT REQUESTS & RESPONSES
app.use(morgan('dev'));

// 'cookie-parser' MIDDLEWARE FOR PARSING COOKIES AND 'express.json' MIDDLEWARE FOR PARSING JSON BODIES OF REQUESTS WITH 'Content-Type' OF 'application/json'
app.use(cookieParser());
app.use(express.json());




// SECURITY MIDDLEWARE:----------------------------------------------
if (!isProduction) {
  // ENABLE 'cors' ONLY IN DEVELOPMENT 'React' FRONTEND WILL BE SERVED FROM A DIFFERENT SERVER THAN THE EXPRESS SERVER 'React' AND 'Express' RESOURCES WILL COME FROM THE SAME ORIGIN IN A 'production' ENVIRONMENT
  app.use(cors());
}

// HELMET HELPS SET A VARIETY OF HEADERS TO BETTER SECURE THE APP
app.use(helmet({
  // THIS KEY IS DISABLED BECAUSE 'React' IS GENERALLY SAFE AT MITIGATING XSS (Cross-Site Scripting) EXPLOITS
  contentSecurityPolicy: false
}));

// SET THE '_csrf' TOKEN AND CREATE 'req.csrfToken' METHOD
app.use(
  // 'csurf' MIDDLEWARE WILL ADD A '_csrf' COOKIE THAT IS HTTP-ONLY (can't be read by JS) TO ANY SERVER RESPONSE.
  // ALSO ADDS A METHOD ON ALL REQUESTS (req.csrfToken) THAT WILL BE SET TO ANOTHER COOKIE (XSRF-TOKEN) LATER ON.
  // BOTH COOKIES WORK TOGETHER TO PROVIDE 'CSRF (Cross-Site Request Forgery)' PROTECTION FOR THE APP.
  // 'XSRF-TOKEN' COOKIE VALUE NEEDS TO BE SENT IN THE HEADER OF ANY REQUEST WITH ALL 'HTTP' VERBS BESIDES 'GET'.
  // THE HEADER WILL THEN BE USED TO VALIDATE THE '_csrf' COOKIE TO CONFIRM THE REQUEST COMING FROM THE APP'S SITE AND NOT AN UNAUTHORIZED SITE.
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);
// SECURITY MIDDLEWARE:----------------------------------------------




// CONNECTING ROUTES:------------------------------------------------
app.use(routes);
// CONNECTING ROUTES:------------------------------------------------




// ERROR HANDLERS:---------------------------------------------------
// CATCH UNHANDLED REQUESTS AND FORWARD TO ERROR HANDLER
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");

  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;

  // 'next()' MUST BE INVOKED WITH ERROR OTHERWISE ERROR HANDLERS WILL NOT BE PASSED TO THE NEXT ERROR HANDLER AFTER 'next()' IS CALLED
  next(err);
});

// PROCESS SEQUELIZE ERRORS
app.use((err, _req, _res, next) => {
  // CHECK IF ERROR IS A SEQUELIZE ERROR
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }

  // EITHER ADD SEQUELIZE ERRORS OR KEEP PASSING THE ERROR TO THE NEXT HANDLER
  next(err);
});

// ERROR FORMATTER
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);

  console.error(err);

  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});
// ERROR HANDLERS:---------------------------------------------------




module.exports = app;
