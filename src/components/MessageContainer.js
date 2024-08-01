// Importing necessary React hooks, components, and styles
import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { userImage, getRandomId } from "./";
import "../styles/MessageContainer.css";

// ---- Component for Displaying Messages in a Conversation ----

// Functional component representing a container for displaying messages in a conversation
function MessageContainer(props) {
  // Destructuring props to extract necessary data
  const { getConversationData, currentUser, getUserData, onSend } = props;

  // State hook to manage conversation data
  const [conversationData, setConversationData] = useState();

  // Ref to remember the bottom scroll element
  const bottomRef = useRef(null);

  // Effect hook to update conversation data when it changes
  useEffect(() => {
    setConversationData(getConversationData());
  }, [getConversationData, conversationData]);

  // Show empty message container if conversation data is undefined
  if (conversationData === undefined) {
    return <div className="message-container"></div>;
  }

  // Get user data for the contact in the conversation
  const userData = getUserData(conversationData.contactId);

  // Handle when the user sends a new text message in the conversation
  function handleSendData() {
    if (document.getElementById("message-input").value === "") {
      return;
    }

    let message = {
      id: getRandomId(10, 999),
      userId: currentUser,
      messageText: document.getElementById("message-input").value,
    };

    document.getElementById("message-input").value = "";

    // Callback to parent component for sending the message
    onSend(conversationData.conversationId, message);
  }

  // Handle key press events (Enter key) for sending messages
  function handleKeyPress(evt) {
    if (evt.keyCode !== 13) {
      return;
    }

    handleSendData();

    // Trigger smooth scroll to bottom when sending a message
    send();
  }

  // Scroll to the bottom of the message area
  function send() {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  // Render the MessageContainer component
  return (
    <div className="message-container">
      <div className="message-bg" data-asset-chat-background-dark="true">
        {/* Container info displaying user profile picture and name */}
        <div className="message-container-info">
          <img
            className="profile-pic"
            width="60px"
            height="60px"
            src={userImage(userData)}
            alt="..."
          />
          <strong>{userData.name}</strong>
        </div>
        
        {/* Area for displaying messages */}
        <div className="message-area">
          {conversationData.messages.map((message) => (
            <Message
              key={message.id}
              type={message.userId === currentUser ? "send" : "receive"}
              id={message.userId}
              content={message.messageText}
              getUserData={getUserData}
            />
          ))}
          
          {/* Ref for bottom scroll element */}
          <div ref={bottomRef} />
        </div>
        
        {/* Input area for typing and sending messages */}
        <div className="message-input">
          <textarea
            id="message-input"
            placeholder="Type a message"
            onKeyUp={handleKeyPress}
          />
          
          {/* Button for sending messages */}
          <button
            onClick={() => {
              handleSendData();
              send();
              send();
            }}
          >
            {/* Send icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="31"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-send"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Export the MessageContainer component as the default export
export default MessageContainer;
