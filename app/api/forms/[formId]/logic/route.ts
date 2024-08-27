import { NextRequest, NextResponse } from "next/server";
import { params } from "../route";

import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: params }) {
  try {
    const form = await prisma.forms.findUnique({
      where: {
        id: context.params.formId,
      },
      select: {
        showOnSpecificDate: true,
        showOnSpecificTime: true,
        showOnSpecificURL: true,
        specificDate: true,
        specificTime: true,
        specificURL: true,
      },
    });
    return NextResponse.json(form, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
