import ContactBotoStart from "@/model/contactBotoStart";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { msg: "مشکل در ارتباط با سرور", success: false },
      { status: 500 }
    );
  }

  try {
    const { firstName, lastName, email, phoneNumber } = await req.json();

    if (!firstName) {
      return NextResponse.json(
        { msg: "اسم خود را درست وارد کنید!", success: false },
        { status: 402 }
      );
    } else if (!email) {
      return NextResponse.json(
        { msg: "ایمیل خود را درست وارد کنید!", success: false },
        { status: 402 }
      );
    } else if (!phoneNumber) {
      return NextResponse.json(
        { msg: "شماره موبایل خود را درست وارد کنید!", success: false },
        { status: 402 }
      );
    }

    await ContactBotoStart.create({
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    const res = NextResponse.json(
      { msg: " اطلاعات با موفقیت ثبت شد", success: true },
      { status: 202 }
    );

    res.headers.set("Access-Control-Allow-Origin", "http://localhost:5173");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    res.headers.set("Cache-Control", "no-store");

    return res;
  } catch (error) {
    return NextResponse.json(
      { msg: "مشکل در ارتباط با سرور", success: false },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB()
    const contactData = await ContactBotoStart.find();

    if (!contactData)
      return NextResponse.json(
        { msg: "دیتایی وجود ندارد!", success: false },
        { status: 404 }
      );

    const res = NextResponse.json(
      { msg: "موفق", success: true, contactData },
      { status: 200 }
    );

    res.headers.set("Access-Control-Allow-Origin", "http://localhost:5173");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    res.headers.set("Cache-Control", "no-store");

    return res;
  } catch (error) {
    return NextResponse.json(
      { msg: "مشکل در ارتباط با سرور", success: false },
      { status: 500 }
    );
  }
}
