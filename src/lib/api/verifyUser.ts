import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../db";
import { User } from "@prisma/client";
import verifyToken from "./verifyToken";

type Props = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export default async function verifyUser({
  req,
  res,
}: Props): Promise<User | null> {
  const token = await verifyToken({ req });

  if (typeof token === "string") {
    res.status(401).json({ response: token });
    return null;
  }

  const userId = token?.id as string;

  const user = await db.user.findUnique({
    where: {
      id: userId,
    }
  });

  if (!user) {
    res.status(404).json({ response: "User not found." });
    return null;
  }

  if (!user.email) {
    res.status(401).json({
      response: "Username not found.",
    });
    return null;
  }

  return user;
}