import React, { useEffect } from 'react'

export const Modal = ({ setIsOpen }: any) => {
    useEffect(() => {
        setTimeout(() => {
            setIsOpen(false)
        }, 6000)
    })
    return (
        <div className='absolute inset-0 bg-purple-200/50 z-10 backdrop-blur '>
            {' '}
            <div className='w-36 h-28 bg-white rounded-md shadow-xl mx-auto mt-16'>
                this is a modal
            </div>
        </div>
    )
}
