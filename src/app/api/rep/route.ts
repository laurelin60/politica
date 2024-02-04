import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, res: NextResponse) {
    const data = { name: "haha", desc: "desc" };

    return res.json(data);
}
