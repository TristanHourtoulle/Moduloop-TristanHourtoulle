// app/api/hello.js

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

export function GET(req: any) {
  return Response.json({ success: true, data: users }, { status: 200 });
}
