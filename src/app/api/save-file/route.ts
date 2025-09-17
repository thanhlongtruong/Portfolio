import { NextResponse } from "next/server";
import File from "../../models/file";
import { connectDB } from "../../lib/connect-mult-mogoose";

export async function POST(req: Request) {
  await connectDB(process.env.MONGO_URI_PORTFOLIO!);

  const { url, name } = await req.json();

  const file = await File.findOneAndUpdate(
    { $or: [{ name }, { url }] },
    { url, name },
    { new: true, upsert: true }
  );
  return NextResponse.json(file);
}
export async function GET() {
  await connectDB(process.env.MONGO_URI_PORTFOLIO!);
  const files = await File.find().sort({ createdAt: -1 }).select("url name");
  return NextResponse.json(files);
}
