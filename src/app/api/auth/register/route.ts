import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/config/prisma";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Error al registrar el usuario" },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error("Se ha producido un error en el registro:", error);
    return NextResponse.json(
      { error: "Error al registrar el usuario" },
      { status: 500 }
    );
  }
}
