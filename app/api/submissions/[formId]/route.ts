import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ObjectKeyGenerator } from "@/lib/object-key-generator";

type Params = {
  formId: string;
};

export async function POST(
  req: NextRequest,
  context: { params: Params }
): Promise<NextResponse> {
  try {
    const { fields } = await req.json();

    if (!fields || !Array.isArray(fields)) {
      return NextResponse.json(
        { error: "fields must be an array" },
        { status: 400 }
      );
    }

    const formId = context.params.formId.trim();

    const message = fields.map((field: any, index: number) => ({
      id: ObjectKeyGenerator()() + index,
      label: field.label,
      value: field.value,
    }));

   

    const [feedback, form] = await prisma.$transaction([
      prisma.feedbacks.create({
        data: {
          message,
          form: {
            connect: { id: formId },
          },
        },
      }),
      prisma.forms.update({
        where: { id: formId },
        data: {
          views: { increment: 1 },
          submissions: { increment: 1 },
        },
      }),
    ]);

    return NextResponse.json({ feedback }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Params }
): Promise<NextResponse> {
  try {
    const feedbacks = await prisma.feedbacks.findMany({
      where: {
        formId: context.params.formId as string,
      },
    });

    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
