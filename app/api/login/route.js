import User from '@/models/User';
import { connectMongoDB } from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectMongoDB();

  try {
    const { email, password } = await req.json();

    // Find user in database by email
    const user = await User.findOne({ email });

    // Validate password, and return throw an error if invalid
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: 'User logged in successfully', user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error logging in user' },
      { status: 500 }
    );
  }
}
