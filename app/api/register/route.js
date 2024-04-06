import User from '@/models/User';
import { connectMongoDB } from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { name, email, password } = await req.json();

  await connectMongoDB();

  // Check to see if email is already in use
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: 'User with that email is already registered' },
      { status: 409 }
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error registering user' },
      { status: 500 }
    );
  }

  // ***** Previous code *****
  // const body = await req.json();
  // const userData = body;
  // const { name, email, password, password2 } = userData;

  // Default role
  // let role = 'user'; // Initialize role as 'user'

  // Check if passwords match
  // if (password !== password2) {
  //   return NextResponse.json({ message: 'Passwords do not match' });
  // }

  // Check if user with that email already exists
  // const existingUser = await User.findOne({ email: userData.email })
  //   .lean()
  //   .exec();
  // if (existingUser) {
  //   return NextResponse.json(
  //     {
  //       message: 'User with that email is already registered',
  //     },
  //     { status: 409 }
  //   );
  // }

  // const hashedPassword = await bcrypt.hash(password, 12);

  // const newUser = await User.create({
  //   name: userData.name,
  //   email: userData.email,
  //   password: hashedPassword,
  //   role,
  // });

  // console.log('User registered successfully: ', newUser);

  // return NextResponse.json({ message: 'User registered successfully' });
}
