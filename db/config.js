const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://aayush2705gupta:1XCLiohbyRiwPwGm@cluster0.fqqki.mongodb.net/e-commerce")
.then(() => {
    console.log('Connected to MongoDB database successfully');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});