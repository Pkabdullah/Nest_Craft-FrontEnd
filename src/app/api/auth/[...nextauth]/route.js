import dbconnect from "@/app/monogdb/dbconnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { UserSignup } from "@/app/monogdb/model";
import GoogleProvider from "next-auth/providers/google";
export const auth = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
  jwt: {
    maxAge: 30 * 60,
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await dbconnect();
          const user = await UserSignup.findOne({ email: email });
          if (!user) {
            throw new Error("No user registered");
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            name: user.fullname,
            email: user.email,
          };
        } catch (error) {
          console.log(error);
          throw new Error("Authentication failed");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
      
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      }
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        image: token.image
      };
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: `/signin`,
  },
};

const handler = NextAuth(auth);
export { handler as GET, handler as POST };
