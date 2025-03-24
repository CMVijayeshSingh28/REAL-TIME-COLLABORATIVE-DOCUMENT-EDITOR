import React from "react";
import Editor from "./Editor";  // Import the Editor component
import { SocketProvider } from "./SocketProvider";  // Import SocketProvider

function App() {
  return (
    <SocketProvider>
      {/* Pass the docId for collaboration */}
      <Editor docId="doc-1" />
    </SocketProvider>
  );
}

export default App;
