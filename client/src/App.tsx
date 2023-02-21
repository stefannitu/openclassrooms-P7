import {
    createBrowserRouter,
    Route,
    RouterProvider,
    Routes,
} from 'react-router-dom'
import { ProtectedRoute } from './components'
import { Home, Login, Profile, Register } from './pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Default } from './Layout/defaultLayout'
const queryClient = new QueryClient()
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
                <QueryClientProvider client={queryClient}>
                    <ProtectedRoute>
                        <Default />
                    </ProtectedRoute>
                </QueryClientProvider>
            ),
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/profile',
                    element: <Profile />,
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
