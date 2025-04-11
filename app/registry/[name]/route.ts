import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { registryItemSchema } from "shadcn/registry";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const registryData = await import("@/registry.json");
    const registry = registryData.default;

    const hook = registry.items.find((c) => c.name === name);

    if (!hook) {
      return NextResponse.json({ error: "Hook not found" }, { status: 404 });
    }

    const registryItem = registryItemSchema.parse(hook);

    if (!registryItem.files?.length) {
      return NextResponse.json({ error: "Hook has no files" }, { status: 400 });
    }

    const filesWithContent = await Promise.all(
      registryItem.files.map(async (file) => {
        const filePath = path.join(process.cwd(), file.path);
        const content = await fs.readFile(filePath, "utf8");
        return { ...file, content };
      })
    );

    return NextResponse.json({ ...registryItem, files: filesWithContent });
  } catch (error) {
    console.error("Error processing hook request:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
