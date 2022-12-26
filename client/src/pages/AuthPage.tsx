import { Register } from '../components/Register'
import { Login } from '../components/Login'

export const AuthPage = () => {
  return (
    <main
      className='grid place-items-center w-full h-full bg-[url("./assets/company.webp")] bg-center bg-cover
                    before:absolute before:w-full before:h-full before:bg-white before:opacity-75'
    >
      <Register />
    </main>
  )
}
