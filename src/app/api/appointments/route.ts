import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const { name, phone, email, date, time, message } = body;

    if (!name || !phone || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newAppointment = await Appointment.create({
      name,
      phone,
      email,
      date,
      time,
      message,
      status: "pending",
    });

    return NextResponse.json({ success: true, data: newAppointment }, { status: 201 });
  } catch (err: any) {
    console.error("Booking Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });
    return NextResponse.json(appointments);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
