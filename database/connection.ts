const mongo = require("mongoose");

const connectDB = async () => {
  try {
    await mongo.connect(
      process.env.MONGO_URL
    );
  } catch (error) {
    console.error("Database erorr: ",error);
    process.exit(1);
  }
};


export default connectDB;