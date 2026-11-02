// Install: npm install express mongoose dotenv cors
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';



dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(helmet());
app.use(morgan('dev')); // 2. Add this line after 'const app = express()'
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow requests from your frontend
app.use(express.json()); // Allows server to accept JSON data in request body

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.error("DB Connection Error:", err));

mongoose.set('debug', true);

// Health Check Endpoint
app.get('/health', async (req, res) => {
    const dbStatus = mongoose.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const statusMap = {
        0: "Disconnected",
        1: "Connected",
        2: "Connecting",
        3: "Disconnecting"
    };

    res.json({
        status: "Server is UP",
        database: statusMap[dbStatus],
        timestamp: new Date(),
        uptime: process.uptime()
    });
});

// Routes
app.use('/api/tasks', taskRoutes);

// Simple root endpoint
app.get('/', (req, res) => {
    res.send('Task Manager API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});