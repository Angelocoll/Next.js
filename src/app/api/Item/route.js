import { NextResponse } from "next/server";
import {
  getIdFromUrl,
  object404Respsonse,
  validateBookData,
} from "@/utils/helpers/apiHelpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//hitta alla item
export async function GET(req, options) {
  try {
    const items = await prisma.item.findMany(); // Hämta alla
    return NextResponse.json(items); // Returnera
  } catch (error) {
    console.log(error);
    return object404Respsonse(NextResponse, "item"); //felhantering
  }
}
//klar
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      {
        status: 400,
      }
    );
  }

  let newItem;
  try {
    newItem = await prisma.item.create({
      data: {
        name: body.name,
        description: body.description,
        quantity: body.quantity,
      },
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Invalid data sent for item creation",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(newItem, {
    status: 201,
  });
}
