import { connectMongoDB } from '@/lib/mongodb';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';
import bcrypt from 'bcrypt';

const authOptions = {
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log('Google profile', profile);

        let userRole = 'google user';
        if (profile.email === process.env.ADMIN_EMAIL) {
          userRole = 'admin';
        }
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        await connectMongoDB();
        const { email, password } = credentials;

        try {
          const user = await User.findOne({ email });

          if (!user || user.password !== password) {
            throw new Error('Invalid email or password');
          }

          return { email: user.email, role: user.role };
        } catch (error) {
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],

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

    async jwt(token, user) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },

    async session(session, user) {
      session.user = user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
