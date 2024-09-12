import { NextResponse } from "next/server";
import {
  getIdFromUrl,
  object404Respsonse,
  validateBookData,
} from "@/utils/helpers/apiHelpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Hitta en unik item baserad på id
export async function GET(req, { params }) {
  const id = params.id;

  try {
    const item = await prisma.item.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return object404Respsonse(NextResponse, "item");
  }
}

// Uppdatera ett item baserat på id
export async function PUT(req, { params }) {
  const id = params.id;

  let body;

  try {
    body = await req.json();
  } catch (error) {
    console.error("Invalid JSON:", error);
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      {
        status: 400,
      }
    );
  }

  if (!body.name || !body.description || isNaN(body.quantity)) {
    console.error("Invalid input data:", body);
    return NextResponse.json(
      {
        message:
          "Invalid input data. Ensure all fields are provided and quantity is a number.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const updatedItem = await prisma.item.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        description: body.description,
        quantity: Number(body.quantity),
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json(
      {
        message: "Failed to update item.",
      },
      {
        status: 500,
      }
    );
  }
}

// Ta bort ett item baserat på id
export async function DELETE(req, { params }) {
  const id = params.id;

  try {
    const deletedItem = await prisma.item.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(deletedItem);
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json(
      {
        message: "Failed to delete item.",
      },
      {
        status: 500,
      }
    );
  }
}
