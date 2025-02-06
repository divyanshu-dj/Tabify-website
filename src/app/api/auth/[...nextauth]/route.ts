// import { NextResponse } from "next/server";

// export function GET() {
//     return NextResponse.json({
//         message: "Hello from the API!"
//     })
// }


import NextAuth from "next-auth";
import authOptions from "./options";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions };