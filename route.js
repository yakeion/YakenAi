import OpenAI from "openai";

export const runtime = "nodejs";

const YAKEN_INSTRUCTIONS = `
Bạn là YAKEN AI, một trợ lý trí tuệ nhân tạo đa năng.
Ưu tiên trả lời bằng tiếng Việt, trừ khi người dùng chọn ngôn ngữ khác.
Phong cách: thân thiện, rõ ràng, chuyên nghiệp và dễ hiểu.
Có thể hỗ trợ học tập, sáng tạo, lập trình, công việc và kiến thức phổ thông.
Không bịa đặt. Nếu không chắc chắn, hãy nói rõ giới hạn và đề xuất cách kiểm chứng.
Bảo vệ quyền riêng tư. Không yêu cầu người dùng gửi mật khẩu, mã xác thực hoặc khóa bí mật.
Không tự nhận có khả năng truy cập dữ liệu, Internet hay thực hiện hành động nếu chưa được cấp công cụ tương ứng.
`;

export async function POST(request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "Máy chủ chưa được cấu hình OPENAI_API_KEY. Hãy thêm khóa API vào .env.local." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];

    const safeMessages = messages
      .filter((item) =>
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string"
      )
      .slice(-12)
      .map((item) => ({
        role: item.role,
        content: item.content.slice(0, 6000)
      }));

    if (!safeMessages.length || safeMessages[safeMessages.length - 1].role !== "user") {
      return Response.json({ error: "Vui lòng nhập câu hỏi trước khi gửi." }, { status: 400 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      instructions: YAKEN_INSTRUCTIONS,
      input: safeMessages,
      max_output_tokens: 1200
    });

    return Response.json({ reply: result.output_text || "Mình chưa tạo được câu trả lời. Bạn thử hỏi lại nhé." });
  } catch (error) {
    console.error("YAKEN AI API error:", error?.message || error);
    return Response.json(
      { error: "Có lỗi khi xử lý yêu cầu. Hãy kiểm tra cấu hình máy chủ hoặc thử lại sau." },
      { status: 500 }
    );
  }
}
