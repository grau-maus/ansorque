const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

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




module.exports = app;
