// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    debug: true,
    providers: [
        CredentialsProvider({
            name: "Custom Login",
            credentials: {
                identifier: { label: "Identifier", type: "text" },
            },
            
            async authorize(credentials) {
                const uid = credentials.uid;
                const token = credentials.token;
                // Validate the identifier here (e.g., against a database).
                if (uid) {
                    return { uid: uid, token: token };
                }

                // Return null if validation fails
                return null;
            },
        }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach custom data to the session
      session.user.uid = token.uid;
      session.user.token = token.token;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        console.log(user)
        token.uid = user.uid;
        token.token = user.token;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
