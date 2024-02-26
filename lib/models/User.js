import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true, // Corrected typo
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  posts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    default: () => [], // Use a function for default value
  },
  savedPosts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    default: () => [], // Use a function for default value
  },
  likedPosts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    default: () => [], // Use a function for default value
  },
  followers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: () => [], // Use a function for default value
  },
  following: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: () => [], // Use a function for default value
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
