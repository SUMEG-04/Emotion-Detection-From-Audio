const mongoose=require('mongoose')

// Now you can access your environment variables
const DB = process.env.mongoDB;

// Use these variables in your MongoDB connection or any other parts of your server code
mongoose.connect(DB).then(()=>{console.log('connection successful')}).catch((err)=>{console.log('no connection:',err)})
