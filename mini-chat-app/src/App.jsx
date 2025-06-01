import { useState } from 'react'

import './App.css'
import ChatApp from './components/ChatApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
     <ChatApp />
       </div>
    </>
  )
}

export default App
