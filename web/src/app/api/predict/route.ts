import { NextResponse } from "next/server";
import { predict, modelFeatures, type PatientInput } from "@/lib/predict";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const missing = modelFeatures.filter((f) => body[f] === undefined || body[f] === "");
    if (missing.length) {
      return NextResponse.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 });
    }
    return NextResponse.json(predict(body as PatientInput));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
