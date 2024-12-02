import dbconnect from "@/app/monogdb/dbconnect";
import { OrderDetails } from "@/app/monogdb/model";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbconnect();
  try {
    const body = await request.json();
    const { userId, customerDetails, items, total, paymentMethod } = body;
    const order = await OrderDetails.create({
      userId,
      customerDetails,
      items,
      total,
      paymentMethod,
      paymentStatus: "Pending",
      orderStatus: "Processing",
    });
    return NextResponse.json({ data: order, success: true });
  } catch (error) {
    return NextResponse.json(
      { succes: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await dbconnect();
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400,
      });
    }
    const orderget = await OrderDetails.find({ userId });
    return NextResponse.json(
      { orderdone: orderget, succes: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await dbconnect();
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const orderId = searchParams.get("orderId");
    if (!userId || !orderId) {
      return new Response(
        JSON.stringify({ message: "User ID and Item ID are required" }),
        { status: 400 }
      );
    }
    const response = await OrderDetails.deleteOne({
      _id: orderId,
      userId: userId,
    });
    if (response.deletedCount === 0) {
      return NextResponse.json({ message: "Order has been canceled" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
