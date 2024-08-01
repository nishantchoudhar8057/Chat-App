// Importing styles for the Conversations component
import "../styles/Conversations.css";
// Importing necessary React hooks from the 'react' library
import { useState, useEffect } from "react";
// Importing the ConversationCard component
import ConversationCard from "./ConversationCard";

// ---- Component for Displaying Existing Conversations ----

// Functional component representing the list of existing conversations
function Conversations(props) {
  // Destructuring props to extract necessary data
  const {
    conversationData,
    getUserData,
    updateConversationId,
    currentUser,
    showNewConvDialog,
  } = props;

  // State hook for managing the list of conversations
  const [conversations, setConversations] = useState(props.conversationData);

  // Extracting user data for each conversation
  const contacts = conversationData.map((conv) => getUserData(conv.contactId));

  // Effect hook to update conversations when the data is modified
  useEffect(() => {
    setConversations(conversationData);
  }, [conversationData]);

  // Function to handle searching conversations by user name
  function handleSearch(evt) {
    // Array to store search results
    let searchResults = [];

    // Check if the search input is not empty and has more than one character
    if (evt.target.value !== "" && evt.target.value.length > 1) {
      // Iterate through contacts to find matching names
      contacts.forEach((element) => {
        if (
          element.name.toLowerCase().includes(evt.target.value.toLowerCase())
        ) {
          // Find the conversation associated with the contact
          let result = conversations.find(
            (conv) => conv !== undefined && conv.contactId === element.id
          );
          // Add unique results to the searchResults array
          if (!searchResults.includes(result)) {
            searchResults.push(result);
          }
        }
      });

      // Update the state with search results
      setConversations(searchResults);
    } else {
      // Reset the state to show all conversations when search is cleared
      setConversations(conversationData);
    }
  }

  // Render the Conversations component
  return (
    <div className="conversation-container">
      {/* Search bar */}
      <div className="search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-search"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="Search" onChange={handleSearch} />
      </div>

      {/* Add conversation button */}
      <div className="add-conversation">
        <strong> CONVERSATIONS</strong>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-plus"
          onClick={() => showNewConvDialog(true)}
          style={{ cursor: "pointer" }}
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>

      {/* List of conversation cards */}
      <div className="conversation-list">
        {conversations.map((conversation) => {
          if (conversation === undefined) return "";

          return (
            <ConversationCard
              key={conversation.conversationId}
              data={conversation}
              getUser={getUserData}
              updateConversationId={updateConversationId}
              currentUser={currentUser}
              newConversation={false}
            />
          );
        })}
      </div>
    </div>
  );
}

// Export the Conversations component as the default export
export default Conversations;
