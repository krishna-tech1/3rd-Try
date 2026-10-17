import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (
      !email ||
      typeof email !== "string" ||
      !email.includes("@") ||
      email.trim().length < 5
    ) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please include a message describing your inquiry." },
        { status: 400 }
      );
    }

    // Target recipient: muthukrishnan8733@gmail.com
    console.log("[CONTACT_INQUIRY] New submission for muthukrishnan8733@gmail.com:", {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message received! Muthu Krishnan will get back to you promptly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CONTACT_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to submit message. Please try again or email directly." },
      { status: 500 }
    );
  }
}
