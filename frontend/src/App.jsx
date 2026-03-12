
import { Route, Routes } from 'react-router'
import ChatPage from './Pages/ChatPage'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'

const App = () => {

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* GRADIENT LIGHT */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />

      {/* PURPLE GLOW */}
      <div className="absolute top-[-150px] left-[-150px] w-[450px] h-[450px] bg-purple-600 opacity-30 blur-[160px] rounded-full animate-pulse" />

      {/* CYAN GLOW */}
      <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-cyan-500 opacity-30 blur-[160px] rounded-full animate-pulse" />

      <div className="absolute w-150 h-[600px] bg-indigo-600 opacity-20 blur-[200px] rounded-full" />

      <Routes>
        <Route path='/' element={<ChatPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </div>
  )
}

export default App
