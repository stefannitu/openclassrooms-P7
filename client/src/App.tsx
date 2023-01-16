import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Dashboard, Login } from './components'
import {} from './components/loginCmp'
import { Default } from './Layout/defaultLayout'

import { New } from './components/new'
import { AuthContextProvider } from './context/authContext'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Default />,

        children: [
            { index: true, element: <Dashboard /> },

            { path: 'login', element: <Login /> },
        ],
    },
    {
        element: <New />,
        path: '/new',
    },
])

function App() {
    return (
        <AuthContextProvider>
            <div className='App w-screen h-screen'>
                <RouterProvider router={router} />
            </div>
        </AuthContextProvider>
    )
}

export default App
