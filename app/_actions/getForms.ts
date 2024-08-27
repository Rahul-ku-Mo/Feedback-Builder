import prisma from "@/lib/prisma";

export const getForms = async () => {
  try {
    const forms = await prisma.forms.findMany();

    return forms;
  } catch (error) {
    console.log(error);
  }
};
