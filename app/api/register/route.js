import User from '@/models/User';
import { connectMongoDB } from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectMongoDB();

  try {
    const { name, email, password } = await req.json();

    // Check if email and password are valid
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Please fill in all fields' },
        { status: 400 }
      );
    }

    // Check to see if email is already in use
    const ifUserExist = await User.findOne({ email });

    if (ifUserExist) {
      return NextResponse.json(
        { message: 'User with that email is already registered' },
        { status: 401 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const savedUser = await new User({
      name,
      email,
      password: hashedPassword,
    });

    // Trim any whitespace from the email and save the user to the database
    savedUser.email = savedUser.email.trim();
    await savedUser.save();

    return NextResponse.json(
      {
        message: 'User registered successfully',
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error registering user',
        success: false,
      },
      { status: 500 }
    );
  }
}
