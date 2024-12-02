import dbconnect from "@/app/monogdb/dbconnect";
import { CartModel } from "@/app/monogdb/model";

export async function POST(req) {
  await dbconnect();

  try {
    const body = await req.json();
    const { productName, price, imageUrl, userId } = body;

    if (!userId || !productName || !price || !imageUrl) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const newCartItem = new CartModel({
      productName,
      price,
      imageUrl,
      userId,
    });

    await newCartItem.save();

    return new Response(
      JSON.stringify({ message: "Item added to cart", newCartItem }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
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

    const cartItems = await CartModel.find({ userId });

    return new Response(JSON.stringify({ cartItems }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await dbconnect();

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const itemId = searchParams.get("itemId");

    if (!userId || !itemId) {
      return new Response(
        JSON.stringify({ message: "User ID and Item ID are required" }),
        { status: 400 }
      );  
    }

    // Remove the item from the cart
    const result = await CartModel.deleteOne({ _id: itemId, userId });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Item not found or not authorized" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ message: "Item removed from cart" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500 }
    );
  }
}

