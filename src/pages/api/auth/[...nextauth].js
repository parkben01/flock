import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: '85019713991-cj6dlmndicf9kfk5guju4n04onuu4q0r.apps.googleusercontent.com',
      clientSecret: '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',
      // clientId: process.env.GOOGLE_ID,
      // clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)