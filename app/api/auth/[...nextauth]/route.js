import { connectMongoDB } from '@/lib/mongodb';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/User';

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
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
