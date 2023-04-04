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
import axios from "axios";

const Chat = () => {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message:
        "Hello! Kaibo AI Assistant here! Ask me any question about regulations!",
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
    await postMessageToChatGPT(newMessages);
  };

  const postMessageToChatGPT = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "chatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explain all concepts like I am a professional architect.",
    };

    await axios
      .post(
        `https://api.openai.com/v1/chat/completions`,
        {
          model: "gpt-3.5-turbo",
          messages: [systemMessage, ...apiMessages],
          temperature: 0.75,
          max_tokens: 60,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.REACT_APP_CHATGPT_API_KEY,
          },
        },
      )
      .then((res) => {
        setMessages([
          ...chatMessages,
          { message: res.data.choices[0].message.content, sender: "chatGPT" },
        ]);
        setTyping(false);
      });
  };

  return (
    <>
      <div className="text-base m-2 border-1 rounded-full border-lightgreen">
        AI Chat
      </div>
      <div className="relative h-[250px] w-[full] rounded-full mx-4 mb-4 drop-shadow-lg">
        <MainContainer className="main">
          <div className="w-full h-[1000px]">
            <ChatContainer>
              <MessageList
                typingIndicator={
                  typing ? (
                    <TypingIndicator content="Kaibo AI is typing ..." />
                  ) : null
                }
                disableOnYReachWhenNoScroll={true}
                autoScrollToBottomOnMount={true}
                autoScrollToBottom={true}
                onYReachEnd={() => console.log("onYReachEnd")}
                onYReachStart={() => console.log("onYReachStart")}
                // className="w-full h-[1000px] overscroll-auto"
              >
                {messages.map((message, index) => (
                  <Message
                    model={message}
                    key={index}
                    className="text-left text-xs"
                  />
                ))}
              </MessageList>
              <MessageInput
                placeholder="Type your question here!"
                onSend={handleSend}
                className="text-left text-xs"
              />
            </ChatContainer>
          </div>
        </MainContainer>
      </div>
    </>
  );
};

export default Chat;
