import User from "@/models/user";
import { postgresConnect } from "@/utils/dbConnect"; // Ensure DB connection
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
const pool=require('@/utils/postgresql');

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) return false;
      await postgresConnect();// Ensure database connection
      const existingUser = await pool.query("SELECT * FROM fullstacknextjs.user WHERE email = $1",[profile.email]);
      if (!existingUser) {
        return "/register"; // Redirect to register page instead of blocking login
      }
      
      return true;
    },
 async jwt({ token, account, profile }) {
      if (profile?.email) {
        await postgresConnect(); // Ensure DB connection       
        const existingUser = await await pool.query("SELECT * FROM fullstacknextjs.user WHERE email = $1",[profile.email]);

        if (existingUser) {
          token.id = existingUser.id.toString();
          token.username = existingUser.username;
          token.email = existingUser.email; // Ensure email is available in session

          // Custom JWT (Optional)
          token.accessToken = jwt.sign(
            { id: existingUser.id, username: existingUser.username },
            process.env.JWT_SECRET!,
             {  
          algorithm: "HS256",
          expiresIn: "1h",
          header: {
            alg: "HS256",
            typ: "JWT"
          }
        }
          );
        }
      }
      return token;
    },

  async session({ session, token }:{session: any, token:any}) {
    if (token) {
      session.user = {
      id: token?.id ?? "",
      username: token?.username ?? "",
      email: token?.email ?? "",
    };
    session.accessToken = token?.accessToken ?? "";
    }
    return session;
  },
  async redirect({ url, baseUrl }) {
       // Redirect to a specific page after login
       return `${baseUrl}/dashboard`; // Change this to the URL you want
     }
  }  
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
