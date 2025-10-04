require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cookiePareser = require("cookie-parser")

const fileupload = require("express-fileupload")

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


//cloudinary config
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Express application',
      contact: {
        name: 'Your Organization',
        email: 'contact@yourorg.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://your-production-url.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token'
        }
      },
    },
  },
  apis: ['./routes/*.js', './app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

//connectDB
const  connectDB = require("./db/connect")

//routers
const authRouter = require("./routes/auth")
const usersRouter = require("./routes/user")
const membersRouter = require("./routes/members")
const tasksRouter = require("./routes/tasks");
const eventsRouter = require("./routes/events")
const contactRouter = require("./routes/contact")
const faqRaouter = require("./routes/faq")
const helpRouter = require("./routes/in-need")
const donationRouter = require("./routes/donations")
const stockRouter = require("./routes/stocks")
const volunteerRouter = require("./routes/volunteers")
const volunteerWaitListRouter = require("./routes/volunteersWaitList")
const sponsorRouter = require("./routes/sponsor")
const sponsorWaitListRouter = require("./routes/sponsorWaitList")
const commentRouter = require("./routes/comment")//this is the ip @nameserver 192.168.190.205 of my computer

const dataRouter = require("./routes/data")


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// app.set('trust proxy', 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// );

// {app.use(express.json());} will grant access to the user's data from the body
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookiePareser())
app.use(fileupload({ useTempFiles: true }))
// extra packages

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// 



// routes
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/users",usersRouter)
app.use("/api/v1/membersWaitList",membersRouter)
app.use("/api/v1/tasks",tasksRouter);
app.use("/api/v1/tasks/:id",tasksRouter);
app.use("/api/v1/events",eventsRouter);
app.use("/api/v1/contactus",contactRouter);
app.use("/api/v1/FAQ",faqRaouter);
app.use("/api/v1/helps",helpRouter);
app.use("/api/v1/donation",donationRouter);
app.use("/api/v1/stock",stockRouter);
app.use("/api/v1/volunteers",volunteerRouter);
app.use("/api/v1/volunteersWaitList",volunteerWaitListRouter);
app.use("/api/v1/sponsor",sponsorRouter);
app.use("/api/v1/sponsorWaitList",sponsorWaitListRouter);
app.use("/api/v1/comment",commentRouter); 
app.use("/api/v1/data",dataRouter);

// Swagger documentation routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`✅ Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};


start();