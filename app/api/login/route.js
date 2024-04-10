import User from '@/models/User';
import { connectMongoDB } from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();

  await connectMongoDB();

  // Find user in database by email
  const user = await User.findOne({ email });

  // Validate password, and return throw an error if invalid
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }

  try {
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
