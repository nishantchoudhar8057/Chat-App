// Importing the userImage utility function and Message component styles
import { userImage } from "./";
import "../styles/Message.css";

// ---- Component for Displaying Text Messages in Any Conversation ----

// Functional component representing a text message in a conversation
function Message(props) {
  // Destructuring props to extract necessary data
  const { id, type, content, getUserData } = props;

  // Fetching user data for the specified user ID
  const userData = getUserData(id);

  // Render the Message component
  return (
    <div
      className="message-block"
      style={{
        // Adjusting message layout based on the message type (send/receive)
        display: "flex",
        flexDirection: type === "send" ? "row-reverse" : "row",
      }}
    >
      <div>
        {/* Message content block */}
        <div className={`message-content ${type}-message`}>
          <p>{content}</p>
          {/* Message arrow for indicating message direction */}
          <div className={`message-arrow ${type}-message-arrow`}></div>
        </div>
        
        {/* Additional information about the message */}
        <div className={`message-info ${type === "send" ? "sender" : ""}`}>
          {/* User profile picture */}
          <img
            className="profile-pic"
            width="40px"
            height="40px"
            src={userImage(userData)}
            alt="..."
          />
          {/* Displaying the sender's name or "You" for sent messages */}
          <strong>{type === "send" ? "You" : userData.name}</strong>
        </div>
      </div>
    </div>
  );
}

// Export the Message component as the default export
export default Message;
