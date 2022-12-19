import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import { Auth } from './components/Auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App w-screen h-screen'>
      <Auth />
    </div>
  )
}

export default App
