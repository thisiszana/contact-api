import ContactBotoStart from "@/model/contactBotoStart";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req, { params: { id } }) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { msg: "مشکل در ارتباط با دیتابیس", success: false },
      { status: 500 }
    );
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { msg: "آیدی معتبر نیست", success: false },
      { status: 400 }
    );
  }

  try {
    const contactData = await ContactBotoStart.findByIdAndDelete(id);

    if (!contactData) {
      return NextResponse.json(
        { msg: "مخاطب مورد نظر پیدا نشد", success: false },
        { status: 404 }
      );
    }

    const res = NextResponse.json(
      { msg: "حذف موفقیت آمیز بود", success: true, contactData },
      { status: 200 }
    );

    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, OPTIONS"
    );
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    res.headers.set("Cache-Control", "no-store");

    return res;
  } catch (error) {
    console.error("Error during delete:", error);
    return NextResponse.json(
      { msg: "مشکل در عملیات حذف", success: false },
      { status: 500 }
    );
  }
}
