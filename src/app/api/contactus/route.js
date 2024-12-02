import { NextResponse } from "next/server";
import dbconnect from "@/app/monogdb/dbconnect";
import { CotactUs } from "@/app/monogdb/model";
export  async function POST(request) {
 
  await dbconnect();
  const payload = await request.json();
  let contactinfo = new CotactUs(payload);
  const response = await contactinfo.save()
  return NextResponse.json({ result: response, success: true });
}

export  async function GET(){
  await dbconnect();
    let data = await CotactUs.find();
    console.log("Form Data",data);
    return NextResponse.json({result:data,success:true},{status:200})
}
