import mongoose, { Schema } from "mongoose";

const signupModel = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export const UserSignup =
  mongoose.models.authentication ||
  mongoose.model("authentication", signupModel);



//Order model

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authentication",
      required: true,
    },
    customerDetails: {
      fullname: { type: String, required: true },
      
      email: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      province: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      zipcode: {
        type: String,
        required: true,
      },
    },
    items: [
      {
        productId: {
          type: String,
          required: true,
        },
        imageUrl: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },qunatity: {
          type: "Number", 
          required: true,
        },
        // quantity: {
        //   type: "Number",
        //   required: true,
        // },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cod"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending"],
      // default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
      default: () => Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days delivery time
    },
  },
  {
    timestamps: true,
  }
);

export const OrderDetails =
  mongoose.models.order || mongoose.model("order", orderSchema);

//contact us model here
  const Contactmodel = new mongoose.Schema(
    {
      
      Name: String,
      Email: String,
      Phone:Number,
      Message: String,
    },
    { timestamps: true }
  );
  export const CotactUs =
    mongoose.models.contact || mongoose.model("contact", Contactmodel);