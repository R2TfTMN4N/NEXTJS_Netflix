import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { email, name, password } = req.body;
    console.log({ email, name, password } )
    if (!email || !name || !password) {
      return res.status(400).json({ error: "Email, name, and password are required" });
    }

    const existingUser = await prismadb.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: "Internal error" });
  }
}
