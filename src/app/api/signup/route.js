import { UserSignup } from "@/app/monogdb/model";
import dbconnect from "@/app/monogdb/dbconnect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(request) {
  await dbconnect();
  const { fullname, email, password } = await request.json();
  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new UserSignup({ fullname, email, password: hashedpassword });
    await user.save();
    console.log("datasss", user._id);
    return NextResponse.json(
      { userId: user._id, fullname: user.fullname, email: user.email,password:user.password },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error here",error);
  }
}
export async function GET() {
  await dbconnect();
  const data = await UserSignup.find();
  console.log("sign up data", data);
  return NextResponse.json({ result: data, success: true }, { status: 200 });
}