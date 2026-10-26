import { appendRecord, newId } from "@/lib/records";
import { validateCustomOrder } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const check = validateCustomOrder(body);
  if (!check.ok) {
    return Response.json(
      { message: "Please check the highlighted fields.", errors: check.errors },
      { status: 400 },
    );
  }

  const requestId = newId("CU");
  await appendRecord("custom-orders", {
    requestId,
    createdAt: new Date().toISOString(),
    status: "new",
    ...check.data,
  });

  return Response.json({ requestId }, { status: 201 });
}
