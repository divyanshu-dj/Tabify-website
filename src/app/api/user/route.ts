import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { hash } from "bcrypt";
import { CreateUserSchema } from "../../../lib/validations";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = CreateUserSchema.parse(body);
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 409 });
        }
        
        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        });
        if (existingUser) {
            return NextResponse.json({ user: null, message: "User with this email already exists"}, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        const { password: _, ...user } = newUser;

        return NextResponse.json({
            user: user,
            message: "User created successfully"
        }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}