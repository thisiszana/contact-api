import ContactBotoStart from "@/model/contactBotoStart";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function PATCH(req, { params: { id } }) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { msg: "مشکل در ارتباط با دیتابیس", success: false },
      { status: 500 }
    );
  }

  try {
    const data = await req.json();

    const updatedContact = await ContactBotoStart.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedContact) {
      return NextResponse.json(
        { msg: "مخاطب یافت نشد", success: false },
        { status: 404 }
      );
    }

    const res = NextResponse.json(
      { msg: "مخاطب با موفقیت به‌روزرسانی شد", success: true, updatedContact },
      { status: 200 }
    );

    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, OPTIONS"
    );
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    res.headers.set("Cache-Control", "no-store");

    return res;
  } catch (error) {
    return NextResponse.json(
      { msg: "مشکل در به‌روزرسانی مخاطب", success: false },
      { status: 500 }
    );
  }
}
