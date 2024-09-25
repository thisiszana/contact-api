import ContactBotoStart from "@/model/contactBotoStart";
import connectDB from "@/utils/connectDB";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await connectDB();
    const contactData = await ContactBotoStart.findById(id);

    if (!contactData) {
      return NextResponse.json(
        { msg: "مخاطب پیدا نشد!", success: false },
        { status: 404 }
      );
    }

    const res = NextResponse.json(
      { msg: "موفق", success: true, contactData },
      { status: 200 }
    );

    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    res.headers.set("Cache-Control", "no-store");

    return res;
  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json(
      { msg: "مشکل در ارتباط با سرور", success: false },
      { status: 500 }
    );
  }
}
