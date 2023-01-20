import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../components'

export const Default = (): JSX.Element => {
    return (
        <div className='h-full flex flex-col '>
            <Header />
            <main className='grid place-items-center bg-gray-50 w-full h-full px-8'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
