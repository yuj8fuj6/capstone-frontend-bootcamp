import React, { useState, useContext } from "react";
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
import { Avatar } from "antd";
import { UserContext } from "../contexts/UserContext";

const SENDERS = {
  CHATGPT: "chatGPT",
  USER: "user",
}

const Chat = () => {
  const { userData, setUserData } = useContext(UserContext);

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
    // no need to await this, as it is the last function call within this function
    await postMessageToChatGPT(newMessages);
  };

  const postMessageToChatGPT = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === SENDERS.CHATGPT ? "assistant" : "user"
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
            "Content-Type": "application/json", // I think this is the default content-type usually for axios.
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
                  typing && (
                    <TypingIndicator content="Kaibo AI is typing ..." />
                  )
                }
                disableOnYReachWhenNoScroll={true}
                autoScrollToBottomOnMount={true}
                autoScrollToBottom={true}
                onYReachEnd={() => console.log("onYReachEnd")} // functionality beyond a console.log would be good!
                onYReachStart={() => console.log("onYReachStart")}
                // className="w-full h-[1000px] overscroll-auto" // remove comments in production code
              >
                {messages.map((message, index) => (
                  <div className="flex flex-row flex-wrap items-center">
                    {message.sender === SENDERS.CHATGPT && (
                      <Avatar
                        src={
                          "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/chatgpt-icon.png"
                        }
                        name={"chatGPT"}
                      />
                    )}
                    <Message
                      model={message}
                      key={index}
                      className="text-left text-xs w-3/4"
                    />
                    {message.sender === SENDERS.USER && (
                      <Avatar src={userData.photo_url} name={userData.name} />
                    )}
                  </div>
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
