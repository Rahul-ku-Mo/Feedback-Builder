import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = {
  formId: string;
};

export async function POST(
  req: NextRequest,
  context: { params: Params }
): Promise<NextResponse> {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "message are required" },
        { status: 400 }
      );
    }

    const formId = context.params.formId.trim();

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
