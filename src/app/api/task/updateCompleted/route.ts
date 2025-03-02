import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/config/verifyToken";
import { prisma } from "@/lib/config/prisma";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const decoded = verifyToken(authHeader || "");

    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, completed } = await request.json();

    const validateTask = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!validateTask) {
      return NextResponse.json(
        { error: "La tarea no existe" },
        { status: 404 }
      );
    }

    if (validateTask.userId !== Number(decoded.id)) {
      return NextResponse.json(
        { error: "El usuario no tiene permisos para editar esta tarea" },
        { status: 404 }
      );
    }

    const updatedTask = await prisma.task.update({
      data: {
        completed,
      },
      where: {
        id: Number(id),
      },
    });

    if (!updatedTask) {
      return NextResponse.json(
        { error: "Ocurrió un error al actualizar la tarea" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTask, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
