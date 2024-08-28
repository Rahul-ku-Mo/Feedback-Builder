import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "@/lib/slug-generator";

/**Create single form */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { title } = await req.json();

  const slug = generateSlug(title);

  try {
    // Check if a form with the given slug already exists
    const existingForm = await prisma.forms.findUnique({
      where: {
        slug: slug,
      },
    });

    if (existingForm) {
      return NextResponse.json(
        { error: "A form with this slug already exists." },
        { status: 400 }
      );
    }

    // Create a new form
    const form = await prisma.forms.create({
      data: {
        title,
        slug,
        specificURL: "",
        showOnSpecificDate: false,
        showOnSpecificTime: false,
        showOnSpecificURL: false,
      },
    });

    return NextResponse.json(form, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get all forms
export async function GET() {
  try {
    const forms = await prisma.forms.findMany();
    return NextResponse.json(forms, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
