import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home.page'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
