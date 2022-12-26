import { Navigate } from 'react-router-dom'
import { Button } from '../components/button'

export const HomePage = () => {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <h1 className=' tracking-wide'> Home Page</h1>
            <div>
                <Button name='login' />
                <Button name='register' />
            </div>
        </div>
    )
}
