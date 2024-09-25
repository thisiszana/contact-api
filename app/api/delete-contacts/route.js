import ContactBotoStart from "@/model/contactBotoStart";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { msg: "مشکل در ارتباط با دیتابیس", success: false },
      { status: 500 }
    );
  }

  try {
    const deleteResult = await ContactBotoStart.deleteMany({});

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { msg: "مخاطبی برای حذف یافت نشد", success: false },
        { status: 404 }
      );
    }

    const res = NextResponse.json(
      { msg: "همه مخاطبین با موفقیت حذف شدند", success: true },
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
    return NextResponse.json(
      { msg: "مشکل در حذف مخاطبین", success: false },
      { status: 500 }
    );
  }
}
