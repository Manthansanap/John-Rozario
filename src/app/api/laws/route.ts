import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Law from "@/models/Law";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    const laws = await Law.find({}).sort({ category: 1 });
    if (laws.length > 0) return NextResponse.json(laws);
  } catch (err) {
    console.warn("MongoDB connection failed, serving mock laws", err);
  }

  const mockLaws = [
    {
      id: "1",
      category: "Property",
      title: "Transfer of Property Act",
      description: "Legal framework governing the transfer of real estate and properties.",
      details: "Comprehensive assistance in property transfers, sales deeds, lease agreements, and ensuring clear titles free from encumbrances.",
    },
    {
      id: "2",
      category: "Property",
      title: "Real Estate Compliance",
      description: "Guidelines for property developers, buyers and regulatory compliance.",
      details: "Ensuring transactions are sound with extensive due diligence, project verification, and secure legal documentation for property handovers.",
    },
    {
      id: "3",
      category: "Civil",
      title: "Contract Law Essentials",
      description: "Key elements of legally binding contracts and remedy for breaches.",
      details: "From service agreements to partnership deeds, we ensure your legal documents are airtight and compliant with the Indian Contract Act.",
    },
    {
      id: "4",
      category: "Corporate",
      title: "Corporate Legal Advisory",
      description: "Navigating business laws and ensuring corporate compliance.",
      details: "Providing expert counsel on business formation, regulatory compliance, mergers, and strategic corporate governance.",
    },
  ];
  return NextResponse.json(mockLaws);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await req.json();
    const law = await Law.create(body);
    return NextResponse.json(law, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    await dbConnect();
    await Law.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    await dbConnect();
    const { _id, ...updateData } = body;
    const law = await Law.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(law);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
