/* app/api/auth/[...nextauth]/route.js -------------------------------- */
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import connectDB from "@/db/connectDb";
import User from "@/models/User";

/* ------------------------------------------------------------------ */
/* NextAuth configuration                                             */
/* ------------------------------------------------------------------ */
const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: { scope: "read:user user:email" } },
    }),
  ],

  callbacks: {
    /* 1. run on each OAuth sign-in ---------------------------------- */
    async signIn({ user, account, profile }) {
      if (account.provider !== "github") return true;

      await connectDB();

      // GitHub always returns primary email in `user.email`
      const userEmail =
        user.email || profile?.email || profile?.emails?.[0]?.value || null;

      if (!userEmail) {
        console.error("❌ GitHub did not return an email address");
        return false; // cancel sign-in
      }

      const githubUsername = profile.login.toLowerCase(); // "abdullah-raashid"
      let doc = await User.findOne({ email: userEmail });

      if (!doc) {
        // first sign-in → create
        await User.create({
          email: userEmail,
          username: githubUsername,
          name: profile?.name || user.name || "",
        });
      } else if (doc.username !== githubUsername) {
        // user existed but slug changed → keep DB in sync
        doc.username = githubUsername;
        await doc.save();
      }
      return true;
    },

    /* 2. JSON Web Token -------------------------------------------- */
    async jwt({ token, profile }) {
      // on first sign-in copy extra data into the token
      if (profile) {
        token.username = profile.login.toLowerCase(); // "abdullah284805"
      }
      return token;
    },

    /* 3. Make data available to client components ------------------ */
    async session({ session, token }) {
      if (token?.username) session.user.username = token.username;
      return session;
    },
  },

  /* (optional) configure a secret & custom base URL in .env -------- */
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: "/auth/error", // your custom error page if you have one
  },
};

/* ------------------------------------------------------------------ */
/* Export NextAuth handlers                                           */
/* ------------------------------------------------------------------ */
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
