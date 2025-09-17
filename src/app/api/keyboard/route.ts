import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { key } = await req.json();

    if (key === process.env.KEYBOARD) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    return NextResponse.json({ success: false }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 400 });
  }
}
