import { memo } from 'react'
export const Footer = memo(() => {
    console.log('footer loading')

    return (
        <footer className='mt-auto flex justify-center items-center bg-black w-full min-h-[100px] text-white'>
            <p>Footer</p>
        </footer>
    )
})
