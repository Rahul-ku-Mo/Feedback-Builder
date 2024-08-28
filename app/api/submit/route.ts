import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const specificURL = searchParams.get("specificURL");

  if (!specificURL) {
    return NextResponse.json(
      { message: "specificURL query parameter is required" },
      { status: 400 }
    );
  }
  try {
    const form = await prisma.forms.findFirst({
      where: {
        specificURL: specificURL,
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
