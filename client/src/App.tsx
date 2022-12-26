import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { AuthPage } from './pages/AuthPage'
import { ErrorPage } from './pages/error-page'
import { HomePage } from './pages/home-page'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
])

function App() {
    return (
        <div className='App w-screen h-screen'>
            <RouterProvider router={router} />
        </div>
    )
}

export default App
