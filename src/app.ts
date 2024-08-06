import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connect';
import tasks from './routes/tasks';

// Initialize dotenv to read environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:8000', 'http://18.183.120.7:8000/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/tasks', tasks);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Start the server
const start = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.error(error);
  }
};

start();
