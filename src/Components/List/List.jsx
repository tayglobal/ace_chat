import React from 'react'
import "./list.css"
import ChatList from "../List/chatList/ChatList";
import Users from "../List/users/Users";

const List = () => {
  return (
    <div className="list">
        <Users/>
        <ChatList/>

    </div>
  )
}

export default List