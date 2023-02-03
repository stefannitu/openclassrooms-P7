import {
    createBrowserRouter,
    Route,
    RouterProvider,
    Routes,
} from 'react-router-dom'
import { ProtectedRoute } from './components'
import { Home, Login, Register } from './pages'
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
                <ProtectedRoute>
                    <QueryClientProvider client={queryClient}>
                        <Default />
                    </QueryClientProvider>
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
