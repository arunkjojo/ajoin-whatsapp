import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import db from "./firebase"
import { 
    doc, 
    deleteDoc, 
    addDoc,
    collection,
    query,
    orderBy,
    onSnapshot,
    Timestamp
} from "firebase/firestore"
import { AddCircle, DeleteForever} from "@mui/icons-material"
import { Link } from "react-router-dom"
import { useStateValue } from "./StateProvider"
import { actionTypes } from "./reducer"
import { password } from "./constants"
import './SidebarChat.css'

const SidebarChat = (props) => {
    const [seed, setSeed] = useState("");
    const { addNewChatVal, name, id } = props;
    const [messages, setMessages] = useState([]);
    const [{ togglerState }, dispatch] = useStateValue();
    useEffect(() => {
        if (id) {
            const messageCollection = collection(db, "rooms", id, "messages");
            const messageQuery = query(messageCollection, orderBy("timestamp", "desc"));
            onSnapshot(messageQuery, (snapshot) =>
              setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
    }, []);
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
      }, []);
      const deleteRoom = () => {
        const passwordVerify = prompt("Enter Admin Password to delete Room");
        if (passwordVerify === password) {
            deleteDoc(doc(db, "rooms", id))
            .then(function () {
              window.location = "/";
            })
            .catch(function (error) {
              console.error("Error removing document: ", error);
            });
        } else {
          alert("You are not authorised to delete rooms");
        }
    };
    const createChat = () => {
        const roomName = prompt('Please Enter name for chat')
        if (roomName && roomName.length >= 20) {
            return alert("enter a shorter name for the room");
        }
        if(roomName) {
            // do some clever database stuff...
            addDoc(collection(db, 'rooms'),{
                name: roomName,
                timestamp: Timestamp.fromDate(new Date()),
            })
        }
    }
    const handleChat = () => {
        dispatch({
          type: actionTypes.SET_TOGGLER,
          togglerState: togglerState + 1,
        });
      };
    
      return addNewChatVal !== "true" ? (
        <div className="sidebarChat">
          <Link to={`/rooms/${id}`} onClick={handleChat}>
            <div className="sidebarChat__wrapper">
              <Avatar src={messages[0]?.photoURL} />
              <div className="sidebarChat__info">
                <h2 className="room__name">{name}</h2>
                <p className="sidebar__lastmessages__color">
                  <span className="sidebar__lastMessageName">
                    {id != "" && messages.length > 0
                      ? messages[0]?.name + ": "
                      : "Loading: "}
                  </span>
                  {id != "" && messages.length > 0
                    ? messages[0]?.message
                    : "Start a new chat"}
                </p>
              </div>
            </div>
          </Link>
          <div className="sidebarChat__delete" onClick={deleteRoom}>
            <DeleteForever />
          </div>
        </div>
      ) : (
        <div onClick={createChat} className="sidebarChat addnew__chat">
          <h2>Add New Room</h2>
          <AddCircle />
        </div>
      );
    }
    
    export default SidebarChat;