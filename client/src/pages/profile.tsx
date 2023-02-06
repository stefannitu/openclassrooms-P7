import { useLocation } from 'react-router-dom'

export const Profile = () => {
    const { state } = useLocation()
    const { userId } = state
    return (
        <>
            <div>Profile page</div>
            <div>{userId}</div>
        </>
    )
}
