import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"


export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
console.log('REFITESR', credentials);
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("Ingen bruker funnet!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Passordet er feil!");
        }
        client.close();
        return { email: user.email };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  
});

