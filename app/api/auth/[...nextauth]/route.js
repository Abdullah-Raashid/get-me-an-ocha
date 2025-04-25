import NextAuth from "next-auth";
// import AppleProvider from "next-auth/providers/apple";
// import FacebookProvider from "next-auth/providers/facebook";
// import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/models/User";
import Payment from "@/models/payment";
import connectDB from "@/db/connectDb";

export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "NextAuth.js <no-reply@example.com>",
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),
  ],
  // callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github") {
        await connectDB();

        const userEmail =
          user.email ||
          (profile.emails && profile.emails[0] && profile.emails[0].value) ||
          profile.email;
        console.log("GitHub Email:", email);
        console.log("GitHub User:", user);

        if (!userEmail) {
          console.error("Email not found from GitHub provider");
          return false; // cancel sign-in
        }

        let existingUser = await User.findOne({ email: userEmail });

        if (!existingUser) {
          const newUser = new User({
            email: userEmail,
            username: userEmail.split("@")[0],
            name: user.name || "", // fallback
          });

          await newUser.save();
        }

        return true;
      }
      return true;
    },
    catch(err) {
      console.error("SignIn callback error:", err);
      return false; // ❌ deny if error happens
    },

    async session({ session, user }) {
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.id = dbUser._id.toString();
      return session;
    },
  },
  async jwt({ token, user, account, profile }) {
    // Add user info to the token right after sign in
    if (account && user) {
      token.userId = user.id;
    }
    return token;
  },
});

export { authoptions as GET, authoptions as POST };
