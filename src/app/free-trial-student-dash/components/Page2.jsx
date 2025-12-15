"use client";
import React, { useState } from 'react';

const Page2 = () => {
  const [step, setStep] = useState(2);
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([
    {
      text: "Hi! Looking forward to our session. I've prepared some practice problems on algebra.",
      sender: "tutor",
      time: "2:30 PM"
    },
    {
      text: "Thanks! See you soon.",
      sender: "student",
      time: "2:45 PM"
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        sender: "student",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4">

        {/* Trial Session Card */}
        <div className="rounded-lg shadow-sm border border-gray-200 p-6 mb-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Trial Session Request</h2>

          {/* Progress Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-2.5 left-0 right-0 h-2 rounded-3xl bg-gray-300 z-0"></div>

              <div
                className="absolute top-2.5 left-0 h-2 rounded-3xl bg-[#0B31BD] z-10 transition-all duration-700 ease-in-out"
                style={{
                  width:
                    window.innerWidth <= 640
                      ? step === 1 ? "22%" : step === 2 ? "55%" : "88%"
                      : window.innerWidth <= 768
                      ? step === 1 ? "18%" : step === 2 ? "52%" : "86%"
                      : step === 1 ? "10%" : step === 2 ? "55%" : "95%"
                }}
              ></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${step >= 1 ? 'bg-[#0B31BD]' : 'bg-gray-300'}`}></div>
                <span className={`text-sm text-center ${step >= 1 ? 'text-gray-700' : 'text-gray-600'}`}>
                  Tutor Matching request
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${step >= 2 ? 'bg-[#0B31BD]' : 'bg-gray-300'}`}></div>
                <span className={`text-sm text-center ${step >= 2 ? 'text-gray-700' : 'text-gray-600'}`}>
                  Trial Session
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${step >= 3 ? 'bg-[#0B31BD]' : 'bg-gray-300'}`}></div>
                <span className={`text-sm text-center ${step >= 3 ? 'text-gray-700' : 'text-gray-600'}`}>
                  Start Learning
                </span>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className="border bg-[#FFF4E6] border-[#FF8A00] rounded-lg p-4">
            <p className="font-normal">We have found the perfect tutor for you.</p>
            <p className="text-sm text-[#666666]">Start chatting and schedule your trial session.</p>
          </div>
        </div>

        {/* Tutor Profile Card */}
        <div className="rounded-lg p-6">
          <div className="flex items-start gap-4 pb-4">
            <div className="w-12 h-12 rounded-full bg-[#0B31BD] flex items-center justify-center text-white font-semibold text-lg">
              JM
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Jessica Martinez</p>
              <p className="text-sm text-gray-600">Math Specialist</p>
            </div>
          </div>
        </div>

        {/* Messaging Card */}
        <div className="rounded-lg shadow-sm border border-gray-200 p-6 mb-6 bg-white">

          {/* Chat Area */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4 h-96 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-3 ${msg.sender === "student" ? "justify-end" : ""}`}>
                {/* Tutor Avatar */}
                {msg.sender === "tutor" && (
                  <div className="w-8 h-8 rounded-full bg-[#0B31BD] flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold">
                    JM
                  </div>
                )}

                <div className={msg.sender === "student" ? "text-right" : ""}>
                  {msg.sender === "tutor" && (
                    <p className="text-xs font-semibold text-gray-700">Jessica Martinez</p>
                  )}
                  
                  <div className={`inline-block rounded-lg p-3 mt-1 max-w-xs ${msg.sender === "student" ? "bg-[#0B31BD] text-white" : "bg-white border border-gray-200"}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  
                  <p className={`text-xs text-gray-500 mt-1 ${msg.sender === "student" ? "text-right" : ""}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input + Send + Attach */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B31BD] focus:ring-2 focus:ring-blue-100 transition"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-[#0B31BD] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Send
              </button>
            </div>

            {/* Attach Button */}
            <div className="flex justify-between items-center">
              <label className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-[#0B31BD] transition-colors">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span className="text-sm font-medium">Attach file</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;