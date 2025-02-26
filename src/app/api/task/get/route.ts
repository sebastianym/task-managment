import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/config/verifyToken";
import { prisma } from "@/lib/config/prisma";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const decoded = verifyToken(authHeader || "");

    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: Number(decoded.id),
      },
    });

    if (!tasks) {
      return NextResponse.json(
        { error: "No se encontraron tareas" },
        { status: 404 }
      );
    }

    return NextResponse.json(tasks);
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
