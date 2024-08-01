// Importing necessary utility functions and styles
import { userImage, getRandomId } from ".";
import "../styles/ConversationCard.css";

// ---- Component for Displaying Info for Every Contact when Creating a New Conversation ----

// Functional component representing a card for displaying information about a contact
// This is used when creating a new conversation
function NewConversationCard(props) {
  // Destructuring props to extract necessary data
  const { currentUser, userData, updateConversation } = props;

  // Checking if the current user is the same as the contact user, and if so, do not render the card
  if (currentUser === userData.id) {
    return null;
  }

  // Handling the click event when a user is selected to start a new conversation
  function handleOnClick() {
    // Creating a new conversation object with a random ID, contact ID, and an empty array for messages
    let newConversation = {
      conversationId: getRandomId(10, 999),
      contactId: userData.id,
      messages: [],
    };

    // Updating the conversation with the new conversation object
    updateConversation(newConversation);
  }

  // Render the NewConversationCard component
  return (
    <div className="conv-card-container" onClick={() => handleOnClick()}>
      <img
        className="profile-pic"
        width="100px"
        height="100px"
        src={userImage(userData)}
        alt="..."
      />
      <div className="conv-info">
        <strong>{userData.name}</strong>
      </div>
    </div>
  );
}

// Export the NewConversationCard component as the default export
export default NewConversationCard;
