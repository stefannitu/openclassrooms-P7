export const Register = () => {
    return (
        <main>
            <form className='flex flex-col gap-4 p-5 bg-white rounded-lg shadow-lg'>
                <legend>
                    <h1>Register</h1>
                </legend>

                <label className="after:content-['*'] after:text-base after:text-red-700 font-bold">
                    First Name
                </label>
                <input
                    type='text'
                    id='userFirstName'
                    name='userFirstName'
                    autoFocus
                    minLength={4}
                    maxLength={10}
                    required
                    className='custom-input'
                />
                <label className="after:content-['*'] after:text-base after:text-red-700 font-bold">
                    Last Name
                </label>
                <input
                    type='text'
                    id='userLastName'
                    name='userLastName'
                    minLength={4}
                    maxLength={10}
                    required
                    className='custom-input'
                />

                <label className="after:content-['*'] after:text-base after:text-red-700 font-bold">
                    Email
                </label>

                <input
                    type='email'
                    id='userEmail'
                    name='userEmail'
                    autoComplete='email'
                    pattern='/^\w+\b@groupomania\.com\b$/'
                    required
                    className='custom-input'
                    aria-describedby='emailDesc'
                />
                <span
                    id='emailDesc'
                    className=' text-sm text-violet-700 font-medium'>
                    Email domain should belong to "@groupomania.com"
                </span>
                <label className="after:content-['*'] after:text-base after:text-red-700 font-bold">
                    Password
                </label>
                <input
                    type='password'
                    id='userPassword'
                    name='userPassword'
                    autoComplete='new-password'
                    required
                    className='custom-input'
                />

                <button className='focus:outline-none focus:bg-fuchsia-50 p-3 w-fit rounded-md'>
                    Register
                </button>
            </form>
        </main>
    )
}
