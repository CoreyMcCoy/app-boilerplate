import { connectMongoDB } from '@/lib/mongodb';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { NewResponse } from 'next/server';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        await connectMongoDB();
        const { email, password } = credentials;

        try {
          // Check to see if email and password are valid
          if (!email || !password) {
            return null;
          }
          // Check if user exists in database
          const user = await User.findOne({ email });

          if (!user) {
            return new NewResponse(401, { message: 'Invalid credentials' });
          }

          // Compare password with hashed password
          const isValid = await bcrypt.compare(password, user.password);

          if (!isValid) {
            return new NewResponse(401, { message: 'Invalid credentials' });
          }

          // Return user if email and password are valid
          return user;
        } catch (error) {
          console.error('Error logging in user: 👉', error);
          return new NewResponse(500, { message: 'Error logging in user' });
        }
      },
    }),
  ],
  // Callbacks for Google provider
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        const { name, email, role } = user;
        try {
          await connectMongoDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            await User.create({ name, email, role });
          }

          return true;
        } catch (error) {
          console.error('Failed to create user', error);
        }
      }

      return user;
    },
  },

  // Enable JSON Web Tokens
  session: {
    strategy: 'jwt',
  },

  // Create JWT secret from environment variable
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
