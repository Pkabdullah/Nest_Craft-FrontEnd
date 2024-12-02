import dbconnect from "@/app/monogdb/dbconnect";
import { CartModel } from "@/utils/models";

export async function DELETE(request) {
    await dbconnect();
    try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get("userId");
      if (!userId) {
        return new Response(
          JSON.stringify({ message: "User Id  are required" }),
          { status: 400 }
         
        );
      }
      const result = await CartModel.deleteMany({ userId });
      return new Response(JSON.stringify({ message: "Clear cart succesfully" }), {
        status: 200,
      });
    } catch (error) {
      return NextResponse.json({message:"Method not found"},{status:500})
    }
  }