import dbconnect from "@/app/monogdb/dbconnect";
import { UserSignup } from "@/app/monogdb/model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbconnect();
    const { email } = await request.json();
    const userexist = await UserSignup.findOne({ email }).select("_id");
    return NextResponse.json({ userexist });
  } catch (error) {
    console.log("User Exist error here", error);
  }
}
