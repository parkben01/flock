import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === 'google' &&
          profile.email_verified &&
          profile.hd === 'areayouth.org') {
            return true
      } else {
        return false;
      }
    },
  },
}
export default NextAuth(authOptions)