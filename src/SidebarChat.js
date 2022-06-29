import React from 'react'
import { Avatar } from '@mui/material'
import db from "./firebase"
import { addDoc, collection } from "firebase/firestore"
import { Link } from 'react-router-dom'
import './SidebarChat.css'

const SidebarChat = ({ addNewChat, name, id }) => {
    const createChat = () => {
        const roomName = prompt('Please Enter name for chat')

        if(roomName) {
            // do some clever database stuff...
            addDoc(collection(db, 'rooms'),{
                name: roomName,
            })
        }
    }
    return !addNewChat 
    ? (
        <Link to={`/rooms/${id}`} >
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/adventurer/${name}.svg`}/>
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>Last message...</p>
                </div>
            </div>
        </Link>
    )
    : (
        <div className='sidebarChat' onClick={createChat}>
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat