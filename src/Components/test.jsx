import Input from '@mui/material/Input'
import React, { useContext, useState } from 'react'
import ChatContext from '../Chcontext/CHContext'
import Button from '@mui/material/Button'
export default function Test() {
    const [usermessage,setusermessage]=useState('')
    const [history,sethistory]=useState('')
    const context = useContext(ChatContext)
    const {loading,ai,sendchat}=context 

const handlechange=(e)=>{
    setusermessage(e.target.value)
}
const send=()=>{
    const id='8ec18b00-155f-41c3-afd2-ae3d8ee5b571'
sendchat(usermessage,id)
}
  return (
  <>
    <div className="container">
      <Input value={usermessage} onChange={handlechange} />
      <Button variant='contained' onClick={send}>Send</Button>
    </div>
    <div className="container mx-4">
      {!loading && ai.map((msg, index) => (
        <div key={index}>
          <strong>{msg.role}:</strong> {msg.content}
        </div>
      ))}
    </div>
  </>
)
   
  
}
