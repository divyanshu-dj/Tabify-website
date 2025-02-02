import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";

// GET /api/links/[id] - Get a specific link
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const link = await db.link.findUnique({
      where: { id: params.id },
    });

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // Verify ownership
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (link.userId !== user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ link });
  } catch (error) {
    console.error("Error fetching link:", error);
    return NextResponse.json(
      { error: "Failed to fetch link" },
      { status: 500 }
    );
  }
}

// PATCH /api/links/[id] - Update a link
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { url, collection, title, description, isPinned, importance, thumbnail, tags } = body;

    const link = await db.link.findUnique({
      where: { id: params.id },
    });

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // Verify ownership
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (link.userId !== user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedLink = await db.link.update({
      where: { id: params.id },
      data: {
        url: url || undefined,
        collection: collection || undefined,
        title: title || undefined,
        description: description || undefined,
        isPinned: isPinned !== undefined ? isPinned : undefined,
        importance: importance !== undefined ? importance : undefined,
        thumbnail: thumbnail || undefined,
        tags: tags || undefined,
      },
    });

    return NextResponse.json({ link: updatedLink });
  } catch (error) {
    console.error("Error updating link:", error);
    return NextResponse.json(
      { error: "Failed to update link" },
      { status: 500 }
    );
  }
}

// DELETE /api/links/[id] - Delete a link
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const link = await db.link.findUnique({
      where: { id: params.id },
    });

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // Verify ownership
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (link.userId !== user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.link.delete({
      where: { id: params.id },
    });

    // Update user's link count
    await db.user.update({
      where: { id: user.id },
      data: { numLinks: { decrement: 1 } },
    });

    return NextResponse.json({ message: "Link deleted successfully" });
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}
