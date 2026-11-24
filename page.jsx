 "use client";

import { useEffect, useRef, useState } from "react";

const starterPrompts = [
  "Giới thiệu về khả năng của bạn",
  "Giúp tôi lên kế hoạch học tiếng Anh",
  "Gợi ý ý tưởng kinh doanh",
  "Giải thích trí tuệ nhân tạo là gì"
];

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Xin chào! Mình là YAKEN AI. Mình có thể hỗ trợ bạn học tập, sáng tạo, công việc và khám phá kiến thức. Hôm nay bạn muốn bắt đầu từ đâu?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text = input) {
    const clean = text.trim();
    if (!clean || loading) return;

    const nextMessages = [...messages, { role: "user", content: clean }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12) })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Không thể kết nối với YAKEN AI.");
      }

      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">Y</div>
          <div>
            <div className="brand-name">YAKEN <span>AI</span></div>
            <div className="brand-sub">INTELLIGENCE WITHOUT LIMITS</div>
          </div>
        </div>
        <button className="new-chat" onClick={() => {
          setMessages([{ role: "assistant", content: "Xin chào! Mình là YAKEN AI. Bạn muốn cùng mình làm gì hôm nay?" }]);
          setError("");
        }}>＋ Cuộc trò chuyện mới</button>
        <div className="side-label">KHÔNG GIAN CỦA BẠN</div>
        <div className="side-item active">✦ Trợ lý AI</div>
        <div className="side-item muted">◷ Lịch sử trò chuyện <small>Sắp ra mắt</small></div>
        <div className="side-item muted">▤ Kho kiến thức <small>Sắp ra mắt</small></div>
        <div className="sidebar-bottom">
          <div className="status-dot" /> Phiên bản thử nghiệm 1.0
          <p>Đang trong quá trình phát triển.</p>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark small">Y</span> YAKEN AI</div>
          <div className="model-label"><span className="status-dot" /> Trợ lý đa năng</div>
          <div className="avatar">Y</div>
        </header>

        <div className="chat-area">
          <div className="welcome">
            <div className="orb"><span>Y</span></div>
            <div className="eyebrow">YOUR PERSONAL AI ASSISTANT</div>
            <h1>Xin chào, mình là <span>YAKEN AI</span></h1>
            <p>Một không gian để bạn đặt câu hỏi, khám phá ý tưởng và biến công việc phức tạp thành điều dễ hiểu.</p>
          </div>

          {messages.length === 1 && (
            <div className="suggestions">
              {starterPrompts.map((prompt) => (
                <button key={prompt} onClick={() => sendMessage(prompt)}>{prompt}<span>↗</span></button>
              ))}
            </div>
          )}

          <div className="messages">
            {messages.map((message, index) => (
              <div className={`message-row ${message.role}`} key={index}>
                <div className="message-avatar">{message.role === "assistant" ? "Y" : "B"}</div>
                <div className="message-content">
                  <div className="message-name">{message.role === "assistant" ? "YAKEN AI" : "BẠN"}</div>
                  <div className="message-text">{message.content}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message-row assistant">
                <div className="message-avatar">Y</div>
                <div className="message-content">
                  <div className="message-name">YAKEN AI</div>
                  <div className="typing"><i></i><i></i><i></i> Đang suy nghĩ...</div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        <div className="composer-wrap">
          {error && <div className="error">{error}</div>}
          <form className="composer" onSubmit={handleSubmit}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Nhập câu hỏi của bạn..."
              rows={1}
              disabled={loading}
            />
            <button className="send" type="submit" disabled={loading || !input.trim()} aria-label="Gửi tin nhắn">↑</button>
          </form>
          <div className="disclaimer">YAKEN AI có thể mắc lỗi. Hãy kiểm tra lại thông tin quan trọng.</div>
        </div>
      </section>
    </main>
  );
}
