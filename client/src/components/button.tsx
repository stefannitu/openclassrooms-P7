import { Link } from 'react-router-dom'

interface BInterface {
    name: string
}

export const Button = (props: BInterface) => {
    return (
        <Link to={props.name}>
            <button
                type='button'
                className=' bg-fuchsia-400 w-24 py-3 rounded mx-9 shadow-md text-fuchsia-50 font-semibold hover:bg-fuchsia-500 focus:bg-purple-600 focus:text-white'>
                {props.name}
            </button>
        </Link>
    )
}
