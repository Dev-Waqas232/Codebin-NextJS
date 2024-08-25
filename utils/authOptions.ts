import connectDB from "@/config/dbConnect";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
("next-auth/providers/credentials");
import { type AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Email..." },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password...",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          await connectDB();
          const user = await User.findOne({ email: email });
          console.log(user.password === password);
          if (user && user.password === password) {
            return user;
          } else {
            throw new Error("Invalid Credentials");
          }
        } catch (error) {
          throw new Error("Something went wrong!");
        }
      },
    }),
  ],
  callbacks: {
    // invoked on successfull sign in
    async signIn({ user }: any) {
      console.log(user);
      // 1. connect to database
      await connectDB();
      // 2. check if user exists
      const userExists = await User.findOne({ email: user.email });
      // 3. if not, then add user to database
      if (!userExists) {
        // Truncate user name if tooo long
        const username = user.name!.slice(0, 20);

        await User.create({
          email: user.email,
          username: username,
          image: user.image,
        });
      }
      // 4. return true to allow sign in
      return true;
    },
    // modifies the session object
    async session({ session }: any) {
      // 1. get user from database
      const user = await User.findOne({ email: session.user.email });
      // 2. assign the user id to the sesssion
      session.user.id = user._id.toString();
      session.user.name = user.username;
      // 3. return session
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
