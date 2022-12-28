import React, { createContext, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { ErrorPage } from './pages/error-page'
import { HomePage } from './pages/home-page'

export type AuthContextType = {
    isAuthenticated: boolean
    setIsAuthenticated: (isAuthenticated: boolean) => void
}
export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
})

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
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return (
        <div className='App w-screen h-screen'>
            <AuthContext.Provider
                value={{ isAuthenticated, setIsAuthenticated }}>
                <RouterProvider router={router} />
            </AuthContext.Provider>
        </div>
    )
}

export default App
