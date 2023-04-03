import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "../main.scss";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "./Chat.css";

const Chat = () => {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello! Kaibo AI Assistant here! Ask me any question!",
      sentTime: `${new Date()}`,
      sender: "chatGPT",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);
  };

  return (
    <>
      <div className="text-base m-2 border-1 rounded-full border-lightgreen">
        AI Chat
      </div>
      <div className="relative h-[250px] w-[full] rounded-full mx-4 mb-4 drop-shadow-lg">
        <MainContainer className="main">
          <ChatContainer>
            <MessageList
              typingIndicator={
                typing ? (
                  <TypingIndicator content="Kaibo AI is typing ..." />
                ) : null
              }
            >
              {messages.map((message) => (
                <Message model={message} className="text-left text-xs" />
              ))}
            </MessageList>
            <MessageInput
              placeholder="Type your question here!"
              onSend={handleSend}
              className="text-left text-xs"
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
};

export default Chat;
