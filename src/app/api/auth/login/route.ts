import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/config/prisma";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json(
        { error: "Ocurrió un error en la autenticación del lado del servidor" },
        { status: 500 }
      );
    }

    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    let token;

    token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const userData = {
      id: user.id,
      name: user.firstName + " " + user.lastName,
    };

    return NextResponse.json({ jwt: token, user: userData });
  } catch (error) {
    console.error("Se ha producido un error en la autenticación:", error);
    return NextResponse.json(
      { error: "Error al autenticar el usuario" },
      { status: 500 }
    );
  }
}
