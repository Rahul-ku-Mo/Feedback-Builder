import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export type params = {
  formId: string;
};

export async function PATCH(
  req: NextRequest,
  context: { params: { formId: string } }
): Promise<NextResponse> {
  let requestBody: any;
  try {
    requestBody = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
  }

  const { isPublished, title } = requestBody;
  const { searchParams } = new URL(req.url);
  const views = searchParams.get("views");
  const submit = searchParams.get("submit");

  try {
    const data: any = {};

    if (title !== undefined) {
      data.title = title;
    }

    if (isPublished !== undefined) {
      data.isPublished = isPublished;
      data.publishedAt = new Date();
    }

    if (views !== null) {
      data.views = { increment: 1 };
    }

    if (submit !== null) {
      data.submit = { increment: 1 };
      data.views = { increment: 1 };
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    console.log(data);

    const form = await prisma.forms.update({
      where: {
        id: context.params.formId,
      },
      data,
    });

    return NextResponse.json(form, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: params }
): Promise<NextResponse> {
  const data = await req.json();

  const updateData: any = {
    title: data.title,
    slug: data.slug,
    showOnSpecificDate: data.showOnSpecificDate,
    showOnSpecificTime: data.showOnSpecificTime,
    showOnSpecificURL: data.showOnSpecificURL,
    updatedAt: new Date(),
    submissions: data.submissions,
    views: data.views,
  };

  if (data.showOnSpecificDate) {
    updateData.specificDate = new Date(data.specificDate).toISOString();
  }

  if (data.showOnSpecificTime) {
    updateData.specificTime = data.specificTime;
  }

  if (data.showOnSpecificURL) {
    updateData.specificURL = data.specificURL;
  }

  try {
    const form = await prisma.forms.update({
      where: {
        id: context.params.formId,
      },
      data: updateData,
    });

    if (data.fields.length > 0) {
      for (const field of data.fields) {
        await prisma.fields.upsert({
          where: {
            id: field.id,
          },
          update: {
            label: field.label,
            type: field.type,
          },
          create: {
            id: field.id,
            label: field.label,
            type: field.type,
            required: field.required,
            errorMessage: field.errorMessage,
            options: field.options,
            form: {
              connect: {
                id: context.params.formId,
              },
            },
          },
        });
      }
    }

    return NextResponse.json(form, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get single form
export async function GET(req: NextRequest, context: { params: params }) {
  try {
    const form = await prisma.forms.findUnique({
      where: {
        id: context.params.formId,
      },
      include: {
        fields: true,
      },
    });
    return NextResponse.json(form, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//Delete the form
export async function DELETE(
  req: NextRequest,
  context: { params: params }
): Promise<NextResponse> {
  const formId = context.params.formId;

  try {
    // Delete related feedbacks first
    await prisma.feedbacks.deleteMany({
      where: {
        formId: formId,
      },
    });

    // Then delete the form
    const form = await prisma.forms.delete({
      where: {
        id: formId,
      },
    });

    return NextResponse.json(form, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
