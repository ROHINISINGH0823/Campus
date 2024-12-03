import React, { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [faq, setFaq] = useState([]);

  // Load FAQ data on component mount
  useEffect(() => {
    const loadFaq = async () => {
      try {
        const response = await fetch("/data/faq.json"); // Path to the FAQ file
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("FAQs Loaded:", data); // Debug log
        setFaq(data);
      } catch (error) {
        console.error("Failed to load FAQ data:", error);
      }
    };
    loadFaq();
  }, []);

  // Search FAQ for a matching question
  const searchFaq = (input) => {
    const lowerInput = input.toLowerCase().trim();
    return faq.find((item) =>
      item.question.toLowerCase().includes(lowerInput)
    );
  };

  // Function to detect and replace URLs with clickable links (display custom text)
  const formatMessageText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
      const displayText = "Click here"; // Define a display text
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${displayText}</a>`;
    });
  };

  // Send user input and get bot response
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user's message to the chat
    const userMessage = { text: userInput, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    // Check for an FAQ match
    const faqResult = searchFaq(userInput);
    console.log("FAQ Search Result:", faqResult); // Debug log
    if (faqResult) {
      setMessages((prev) => [
        ...prev,
        { text: formatMessageText(faqResult.answer), sender: "bot" }, // Format answer text if it contains URLs
      ]);
      return;
    }

    // Send message to backend if no FAQ match found
    try {
      const response = await axios.post("http://localhost:3001/chat", {
        userInput,
      });
      const botReply = response.data.botReply || "Sorry, I didn't understand that.";
      setMessages((prev) => [
        ...prev,
        { text: formatMessageText(botReply), sender: "bot" }, // Format reply text if it contains URLs
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Oops! Something went wrong. Please try again later.", sender: "bot" },
      ]);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        right: "20px",
        borderRadius: "10px 10px 0 0",
        padding: "10px",
        maxWidth: "300px",
        maxHeight: "220px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Chat Display */}
      <div
        style={{
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
          padding: "8px",
          borderRadius: "5px",
          backgroundColor: "#ffffff",
          fontSize: "14px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong>
            {/* Displaying message content with HTML */}
            <p dangerouslySetInnerHTML={{ __html: msg.text }} />
          </div>
        ))}
      </div>

      {/* Input Field and Send Button */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "5px",
            fontSize: "14px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "8px 12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
