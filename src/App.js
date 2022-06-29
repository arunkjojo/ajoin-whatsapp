import React from "react"
import { Routes, Route } from "react-router-dom"
import Chat from "./Chat"
import Sidebar from "./Sidebar"
import Login from "./Login"
import "./App.css"
import { useStateValue } from "./StateProvider"
import UseWindowDimensions from "./UseWindowDimensions"

function App() {
  const [{ user }, dispatch] = useStateValue();
  const { width } = UseWindowDimensions();
  const uid =
    localStorage.getItem("uid") !== undefined
      ? localStorage.getItem("uid")
      : null;
  return (
    // BEM Naming convetion

    <div className="app">
    {!user ? (
      <Login />
    ) : (
      <div className="app_body">
        <Sidebar />
        <Routes>
          <Route path="/rooms/:roomId" element={<Chat />} />
          <Route path="/" element={
            <Chat />
          } />
        </Routes>
      </div>
    )}
  </div>
  );
}

export default App;
