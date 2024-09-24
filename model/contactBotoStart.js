import { Schema, models, model } from "mongoose";

const contactBotoSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
  },
  { timestamps: true }
);

const ContactBotoStart =
  models?.ContactBotoStart || model("ContactBotoStart", contactBotoSchema);
export default ContactBotoStart;
