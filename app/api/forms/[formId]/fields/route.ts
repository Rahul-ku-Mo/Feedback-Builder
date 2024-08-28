import { NextRequest, NextResponse } from "next/server";
import { params } from "../route";

import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: params }) {
  try {
    const fields = await prisma.fields.findMany({
      where: {
        formId: context.params.formId.trim(),
      },
    });

    return NextResponse.json(fields, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
