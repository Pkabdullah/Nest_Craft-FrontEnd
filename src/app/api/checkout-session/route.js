import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(request) {
  const body = await request.json();
  console.log("stripe body", body);

  try {
    if (body.length > 0) {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [{ shipping_rate: "shr_1QEs07AxtGDhFlbpYyFpvLmQ" }],
        line_items: body.map((item) => {
          return {
            price_data: {
              currency: "pkr",
              product_data: {
                name: item.productName,
                images: [ item.imageUrl], 
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
          };
        }),
        phone_number_collection: {
          enabled: true,
        },
        mode: "payment",
        success_url: `${request.headers.get("origin")}/?success=true`,
        cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      });
      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ message: "No data here!" });
    }
  } catch (err) {
    return NextResponse.json(err); 
  }
}
