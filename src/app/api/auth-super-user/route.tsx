import jwt from "jsonwebtoken";
import db from "@/app/libs/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { cookies } from "next/headers";
//import bcrypt from "bcryptjs";

interface User {
  id: number;
  username: string;
  password: string;
}

export async function POST(req: Request, res: Response) {
  try {
    console.log("asdasdsad");

    const data: { username: string; password: string } = await req.json();

    const [user]: [RowDataPacket[], any] = await db.query(
      "SELECT * FROM super_user WHERE username = ?",
      [data.username]
    );

    console.log(user);

    if (user.length > 0) {
      const userData = user[0];

      // CUANDO LA CONTRASEÑA ESTÉ ENCRYPTADA USAR ESTO
      // const isPasswordValid = await bcrypt.compare(
      //   data.password,
      //   userData.password
      // );

      // if (!isPasswordValid) {
      //   return NextResponse.json(
      //     { message: "Invalid credentials" },
      //     { status: 401 }
      //   );
      // }

      if (data.password !== userData.password) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }

      const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

      const token = jwt.sign(
        { id: userData.id, username: userData.username },
        process.env.JWT_SECRET || "vk&fm3%gOFDn74nLfndikKJF52j&mrme&2m6",
        { expiresIn: "1d" }
      );

      cookies().set("tokenSuperUser", token, {
        httpOnly: true,
        secure: false, // en produccion es true
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
      });

      return NextResponse.json({ token });
    } else {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json("error", {
      status: 500,
    });
  }
}
