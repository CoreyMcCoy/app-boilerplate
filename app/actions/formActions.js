'use server';

import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';

// Add a new user to the database
export const addUser = async (formData) => {
  await connectMongoDB();
  const user = User({
    name: formData.get('name'),
    email: formData.get('email'),
  });
  await user.save();
  revalidatePath('/'); // revalidate the home page
};

// // Get all users from the database
// export const getServerData = async () => {
//   'use server';
//   await connectMongoDB();
//   const getUsers = await User.find({});
//   return getUsers;
// };
// const users = await getServerData();

// Update a user's email in the database
export const updateUser = async (formData) => {
  await connectMongoDB();
  // find the user by email
  const user = await User.findOne({ email: formData.get('email') });
  console.log(user);
  // update the user new email from the form
  user.email = formData.get('new-email');
  // save the updated user
  await user.save();
  revalidatePath('/'); // revalidate the home page
};
