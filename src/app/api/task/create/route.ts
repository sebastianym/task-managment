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

    const { title, description, dueDate, priority, category } =
      await request.json();

    const createdTask = await prisma.task.create({
      data: {
        title,
        description,
        due_date: dueDate,
        priority,
        category,
        user: {
          connect: {
            id: Number(decoded.id),
          },
        },
      },
    });

    if (!createdTask) {
      return NextResponse.json(
        { error: "Ocurrió un error al crear la tarea" },
        { status: 404 }
      );
    }

    return NextResponse.json(createdTask, { status: 201 });
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
