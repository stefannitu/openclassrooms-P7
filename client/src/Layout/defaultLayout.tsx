import { Outlet } from 'react-router-dom'
import { Header } from '../components'

export const Default = (): JSX.Element => {
    return (
        <div className='h-screen flex flex-col bg-gray-300 '>
            <Header />
            <main className='grid place-items-center bg-cyan-50 w-full h-full px-8'>
                <Outlet />
            </main>
        </div>
    )
}
