import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export type params = {
  formId: string;
};

export async function PATCH(
  req: NextRequest,
  context: { params: params }
): Promise<NextResponse> {
  const { isPublished, title } = await req.json();

  try {
    if (isPublished === undefined) {
      const form = await prisma.forms.update({
        where: {
          id: context.params.formId,
        },
        data: {
          title,
        },
      });
      return NextResponse.json(form, { status: 200 });
    }

    const form = await prisma.forms.update({
      where: {
        id: context.params.formId,
      },
      data: {
        isPublished,
        publishedAt: new Date(),
      },
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
