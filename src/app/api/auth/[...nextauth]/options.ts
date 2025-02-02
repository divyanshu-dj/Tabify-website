import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "../../../../lib/db";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            allowDangerousEmailAccountLinking: true,
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.exp = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60); // 30 days
            }
            return token;
        },
        async session({session, token}) {
            return { ...session, user: { ...session.user, id: token.id} }
        },
        async signIn({profile}) {
            // console.log('signIn:', { user, account, profile });
            if( !profile?.email) {
                throw new Error('No email returned from Google');
            }
            await db.user.upsert({
                where: { email: profile.email },
                update: {
                    email: profile.email,
                    name: profile.name,
                    image: profile.image
                },
                create: {
                    email: profile.email,
                    name: profile.name,
                    image: profile.image
                }
            });
            return true;
        },
    },
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.SECRET,
}

export default authOptions;