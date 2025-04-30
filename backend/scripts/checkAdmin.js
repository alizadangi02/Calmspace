require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const checkAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Check all admins in the database
    const admins = await Admin.find({});
    console.log('All admins in database:', admins);

    // Check specific admin
    const admin = await Admin.findOne({ email: 'admin@calmspace.com' });
    console.log('Specific admin:', admin);

  } catch (error) {
    console.error('Error:', error);
    console.error('Error stack:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

checkAdmin(); 