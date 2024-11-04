import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/User';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';

const authOptions = {
  providers: [
    GoogleProvider({
      profile: (profile) => {
        let userRole = 'user';
        let accountType = 'trial';

        if (profile.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
          userRole = 'admin';
        }

        return {
          ...profile,
          id: profile.sub,
          image: profile.picture,
          role: userRole,
          accountType: accountType,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();

          // Check if user exists in database
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }

          // Compare password with hashed password
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          // Return user if email and password are valid
          return user;
        } catch (error) {
          console.error('Error logging in user: 👉', error);
        }
      },
    }),
  ],

  // Enable JSON Web Tokens
  session: {
    strategy: 'jwt',
  },

  // Callbacks for Google provider
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          const { name, email, role, accountType } = user;
          await connectMongoDB();
          const ifUserExists = await User.findOne({ email });

          if (ifUserExists) {
            return user;
          }
          const newUser = new User({
            name,
            email,
            role,
            accountType,
          });
          const res = await newUser.save();
          if (res.status === 200 || res.status === 201) {
            return user;
          }
        } catch (error) {
          console.log('Failed to create user', error);
        }
      }

      return user;
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accountType = user.accountType;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.accountType = token.accountType;
      }
      console.log('Session from Auth', session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
