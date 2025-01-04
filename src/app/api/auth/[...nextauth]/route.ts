// import { NextResponse } from "next/server";

// export function GET() {
//     return NextResponse.json({
//         message: "Hello from the API!"
//     })
// }


import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ]
}