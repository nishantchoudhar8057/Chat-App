// Importing necessary React hooks, components, and styles
import NewConversationCard from "./NewConversationCard";
import "../styles/NewConversation.css";

// ---- Component for Adding/Starting a New Conversation ----

// Functional component representing the dialog for adding/starting a new conversation
const NewConversation = (props) => {
  // Destructuring props to extract necessary data
  const { contacts, currentUser, showNewConvDialog, updateConversation } = props;

  // Render the NewConversation component
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-content">
        
        {/* Modal heading with title and close icon */}
        <div className="modal-heading">
          <h2>New Conversation</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x"
            onClick={() => showNewConvDialog(false)}
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>

        {/* Mapping through contacts to display NewConversationCard for each contact */}
        {contacts.map((contact) => (
          <NewConversationCard
            key={contact.id}
            userData={contact}
            currentUser={currentUser}
            updateConversation={updateConversation}
          />
        ))}
      </div>
    </div>
  );
};

// Export the NewConversation component as the default export
export default NewConversation;
