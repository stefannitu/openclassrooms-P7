import { Route, Routes } from 'react-router-dom'
import { Dashboard, Login, ProtectedRoute, Register } from './components'

import { Default } from './Layout/defaultLayout'
import { AuthContextProvider } from './context/authContext'

function App() {
    return (
        <AuthContextProvider>
            <Routes>
                <Route path='/' element={<ProtectedRoute />}>
                    <Route element={<Default />}>
                        <Route index element={<Dashboard />} />
                    </Route>
                </Route>
                <Route element={<Default />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Route>
            </Routes>
        </AuthContextProvider>
    )
}

export default App
