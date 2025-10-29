import React, { useState, useRef, useEffect } from "react";

function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, sender: "bot", message: "👋 Hi there! I'm Gemini AI." },
        { id: 2, sender: "bot", message: "How can I assist you today?" },
        { id: 3, sender: "employee", message: "Tell me about our company policy." },
        { id: 4, sender: "bot", message: "Our company encourages innovation and teamwork across all departments." },
    ]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const chatRef = useRef(null);

    // Scroll to bottom when new message arrives
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isBotTyping]);

    // Detect click outside to close chat
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatRef.current && !chatRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const sendMessage = () => {
        if (!message.trim()) return;
        const newMsg = { id: Date.now(), sender: "employee", message };
        setMessages((prev) => [...prev, newMsg]);
        setMessage("");
        setIsBotTyping(true);

        setTimeout(() => {
            const reply = {
                id: Date.now() + 1,
                sender: "bot",
                message: "Thanks for your message! I'm just a static demo right now. 😊",
            };
            setMessages((prev) => [...prev, reply]);
            setIsBotTyping(false);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans" ref={chatRef}>
            {/* Floating Gemini Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white p-4 rounded-full shadow-lg border hover:scale-110 transition-transform focus:ring-2 focus:ring-blue-500 animate-bounce-slow"
                title="Gemini AI"
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                    alt="Gemini AI"
                    className="w-10 h-10"
                />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="w-80 sm:w-96 h-[60vh] bg-white shadow-2xl rounded-2xl absolute bottom-20 right-0 flex flex-col overflow-hidden border origin-bottom-right animate-fade-in-up">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3.5">
                        <h3 className="font-semibold text-lg flex items-center space-x-2">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                                alt="AI Avatar"
                                className="w-6 h-6"
                            />
                            <span>Gemini AI</span>
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
                            ✖
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "employee" ? "justify-end" : "justify-start"}`}
                            >
                                {msg.sender === "bot" && (
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                                        alt="Bot Avatar"
                                        className="w-7 h-7 mr-2 rounded-full border border-gray-200 bg-white"
                                    />
                                )}
                                <div
                                    className={`p-2.5 rounded-lg max-w-[80%] text-sm shadow-sm ${msg.sender === "employee"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-900"
                                        }`}
                                >
                                    {msg.message}
                                </div>
                            </div>
                        ))}

                        {/* Typing Animation */}
                        {isBotTyping && (
                            <div className="flex items-end justify-start">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                                    alt="Bot Avatar"
                                    className="w-7 h-7 mr-2 rounded-full border border-gray-200 bg-white"
                                />
                                <div className="p-2.5 rounded-lg bg-gray-200 text-gray-900 flex space-x-1.5 items-center">
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce-slow-1"></span>
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce-slow-2"></span>
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce-slow-3"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="flex p-2 border-t border-gray-200">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2 text-sm border rounded-full outline-none"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isBotTyping}
                            className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm disabled:opacity-50"
                        >
                            Send
                        </button>
                    </div>

                    {/* Animations */}
                    <style>{`
            @keyframes fade-in-up { from {opacity: 0; transform: translateY(20px) scale(0.95);} to {opacity: 1; transform: translateY(0) scale(1);} }
            .animate-fade-in-up { animation: fade-in-up 0.3s ease-out; }
            @keyframes bounce-slow { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
            .animate-bounce-slow { animation: bounce-slow 2s infinite ease-in-out; }
            .animate-bounce-slow-1 { animation: bounce-slow 1.2s infinite ease-in-out; }
            .animate-bounce-slow-2 { animation: bounce-slow 1.2s infinite ease-in-out; animation-delay: 0.2s; }
            .animate-bounce-slow-3 { animation: bounce-slow 1.2s infinite ease-in-out; animation-delay: 0.4s; }
          `}</style>
                </div>
            )}
        </div>
    );
}

// --- App Component ---
export default function App() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <ChatWidget />
        </div>
    );
}
