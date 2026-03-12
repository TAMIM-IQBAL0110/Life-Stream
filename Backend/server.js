const app = require('./app')
const connectDB = require('./config/db.config')
const PORT = process.env.PORT || 5000;

// database connection
connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
