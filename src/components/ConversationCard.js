// Importing the userImage function from the root directory and the corresponding styles
import { userImage } from "./";
import "../styles/ConversationCard.css";

// ---- Card Component for every Existing Conversation ----

// Functional component representing a card for an existing conversation
function ConversationCard(props) {
  // Destructuring props to extract necessary data
  const { data, getUser, updateConversationId, currentUser } = props;

  // Get User Data of the given Contact Id from Parent State Hook
  const userData = getUser(data.contactId);

  // Function to retrieve the last message sent in this conversation
  function lastMessage() {
    // Default value for the last message text
    let lastText = "";

    // Check if there are messages in the conversation
    if (data.messages.length > 0) {
      // Get the last message
      const message = data.messages[data.messages.length - 1];

      // Determine if the last message was sent by the current user
      lastText =
        message.userId === currentUser
          ? "You: " + message.messageText
          : message.messageText;
    }

    return lastText;
  }

  // Render the ConversationCard component
  return (
    <div
      className="conv-card-container"
      onClick={() => updateConversationId(data.conversationId)}
    >
      {/* Display the user profile picture */}
      <img
        className="profile-pic"
        width="65px"
        height="65px"
        src={userImage(userData)}
        alt="..."
      />
      {/* Display the conversation information */}
      <div className="conv-info">
        {/* Display the user's name */}
        <strong>{userData.name}</strong>
        {/* Display the last message in the conversation */}
        <small>{lastMessage()}</small>
      </div>
    </div>
  );
}

// Export the ConversationCard component as the default export
export default ConversationCard;
