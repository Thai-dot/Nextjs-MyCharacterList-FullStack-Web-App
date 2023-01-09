import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type:String,
      require:true,
    },
    lastName: {
      type:String,
      require:true,
    },
    email: {
      type:String,
      unique:true,
      require:true,
    },
    password: {
      type:String,
      require:true,
    },
    gender: {
      type:String,
      unique:true,
      enum:["Male","Female","Others"]
    },
    role:{
      type:Number,
      default:1,
      enum:[1,2]
    }

  },
  {
    timestamps:true
  }
)



export default mongoose.models.User || mongoose.model('User', UserSchema);