import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";

// Call connectToDB at the beginning of your application
connectToDB();

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    // No need to call connectToDB here since it's already called once
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePhoto: image_url,
          email: email_addresses[0].email_address,
          username: username,
        },
      },
      { upsert: true, new: true } // if user doesn't exist, create a new one
    );

    await user.save();
    return user;
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw error; // Re-throw the error to propagate it upward
  }
};

export const deleteUser = async (id) => {
  try {
    // No need to call connectToDB here since it's already called once
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Re-throw the error to propagate it upward
  }
};
