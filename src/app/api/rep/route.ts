export function GET(req, res) {
    const data = { name: "haha", desc: "desc" };

    return res.json(data);
}
