import { useLocation } from 'react-router-dom'

export const Profile = () => {
    const { state } = useLocation()
    const { userId } = state
    return (
        <>
            <div>Profile unsplash image</div>
            <div>
                profile card
                {userId}
                user image user first user last Delete(only for you)
            </div>
            <div> list of user posts</div>
        </>
    )
}
