import { NextRequest, NextResponse } from "next/server";
import { params } from "../route";

import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: params }) {
  try {
    const fields = await prisma.fields.findMany({
      where: {
        id: context.params.formId,
      },
    });
    return NextResponse.json(fields, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request, context: { params: params }) {
  try {
    const { fields } = await req.json();

    if (!fields || !Array.isArray(fields)) {
      return NextResponse.json(
        { error: "fields must be an array" },
        { status: 400 }
      );
    }

    const formId = context.params.formId.trim();

    const messages = fields.map((field: any, index: number) => ({
      id: (index + 1).toString(),
      label: field.label,
      value: field.value,
    }));

    const messageObject = {
      message: messages,
    };

    const feedback = await prisma.feedbacks.create({
      data: {
        form: {
          connect: { id: formId },
        },
        message: JSON.stringify(messageObject),
      },
    });

    return NextResponse.json({ feedback }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
