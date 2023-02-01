import {
    createBrowserRouter,
    Route,
    RouterProvider,
    Routes,
} from 'react-router-dom'
import { ProtectedRoute } from './components'
import { Home, Login, Register } from './pages'

import { Default } from './Layout/defaultLayout'

function App() {
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/register',
            element: <Register />,
        },
        {
            path: '/',
            element: (
                <ProtectedRoute>
                    <Default />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
            ],
        },
    ])

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
