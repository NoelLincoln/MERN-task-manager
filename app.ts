import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './db/connect';
import tasks from './routes/tasks';

// Initialize dotenv to read environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/tasks', tasks);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

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
