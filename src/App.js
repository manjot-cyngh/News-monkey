import React from 'react'
import Navbar from './Components/Navbar'
import Newsbody from './Components/Newsbody'
import { BrowserRouter } from 'react-router-dom'

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Newsbody headline='general'/>
    </BrowserRouter>
    </>
  )
}