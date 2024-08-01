// Importing necessary dependencies and styles
import { useState, useEffect } from "react";
import "../styles/App.css";

// Importing dummy data for contacts and conversations
import contactList from "../DummyData/dummyContacts.json";
import conversationList from "../DummyData/dummyConversations.json";

// Importing components used in the main App component
import Conversations from "./Conversations";
import MessageContainer from "./MessageContainer";
import NewConversation from "./NewConversation";

// Main App component
function App() {
  // Dummy Logged in User
  const loggedInUser = "myUser";

  // State Hooks for Contacts, Existing Conversations, Current Conversation Id, and Add Conversation Dialog
  const [contacts, setContacts] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState("");
  const [addingConversation, setAddingConversation] = useState(false);

  // Set the states with Dummy Data from JSON for Contacts and Conversations
  useEffect(() => {
    setContacts(contactList);
    setConversations(conversationList);
  }, []);

  // Returns User Data for a given id from Contacts
  function getUserData(userId) {
    const userIndex = contacts.findIndex((user) => user.id === userId);
    return contacts[userIndex];
  }

  // Returns Conversation Data for the currently selected Conversation by its ID
  function getConversationData() {
    const convIndex = conversations.findIndex(
      (conv) => conv.conversationId === currentConversationId
    );
    return conversations[convIndex];
  }

  // Set Current Conversation Id
  function updateCurrentConversationId(id) {
    setCurrentConversationId(id);
  }

  // Handle Update/Add new messages in the given conversation
  function updateConversationMessages(conversationId, message) {
    const conversationIndex = conversations.findIndex(
      (conv) => conv.conversationId === conversationId
    );

    let updatedConversation = [...conversations];
    updatedConversation[conversationIndex].messages.push(message);

    console.log(updatedConversation);

    setConversations(updatedConversation);
  }

  // Handle Show/Add New Conversation of a contact
  function handleUpdateConversation(newConversation) {
    let updatedConversation = [...conversations];
    const conversationIndex = updatedConversation.findIndex(
      (conv) => conv.contactId === newConversation.contactId
    );

    if (conversationIndex === -1) {
      updatedConversation.push(newConversation);
      setConversations(updatedConversation);
    } else {
      setCurrentConversationId(
        updatedConversation[conversationIndex].conversationId
      );
    }

    setAddingConversation(false);
  }

  // Rendering the main container with Conversations, NewConversation, and MessageContainer components
  return (
    <div className="main-container">
      {addingConversation && (
        // Render the NewConversation component when addingConversation state is true
        <NewConversation
          contacts={contacts}
          currentUser={loggedInUser}
          showNewConvDialog={setAddingConversation}
          updateConversation={handleUpdateConversation}
        />
      )}

      {/* Render the Conversations component */}
      <Conversations
        conversationData={conversations}
        currentUser={loggedInUser}
        getUserData={getUserData}
        updateConversationId={updateCurrentConversationId}
        showNewConvDialog={setAddingConversation}
      />

      {/* Render the MessageContainer component */}
      <MessageContainer
        getConversationData={getConversationData}
        currentUser={loggedInUser}
        getUserData={getUserData}
        onSend={updateConversationMessages}
      />
    </div>
  );
}

// Export the App component as the default export
export default App;
