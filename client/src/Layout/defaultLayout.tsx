import { Outlet } from 'react-router-dom'
import { Header } from '../components'

export const Default = (): JSX.Element => {
    return (
        <div className=' flex flex-col bg-gradient-to-l from-sky-500 to-indigo-500 w-full min-h-screen'>
            <Header />
            <main className='h-full grid place-content-center my-4'>
                <Outlet />
            </main>
        </div>
    )
}
