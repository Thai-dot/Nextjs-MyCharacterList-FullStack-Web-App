import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema(
  {
    characterName: {
      type: String,
      require: true,
    },
    movie: {
      type: String,
      require: true,
      default: "Don't know",
    },
    age: {
      type: Number,
      require: true,
      default: 0,
      min: 0,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Others'],
    },
    image: {
      type: Buffer,
    },
    imageTag:{
      type:String,
      default:""
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Character ||
  mongoose.model('Character', CharacterSchema);
