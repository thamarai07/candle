import { appendRecord, newId } from "@/lib/records";
import { validateEnquiry } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const check = validateEnquiry(body);
  if (!check.ok) {
    return Response.json(
      { message: "Please check the highlighted fields.", errors: check.errors },
      { status: 400 },
    );
  }

  const id = newId("EQ");
  await appendRecord("enquiries", {
    id,
    createdAt: new Date().toISOString(),
    ...check.data,
  });

  return Response.json({ id }, { status: 201 });
}
