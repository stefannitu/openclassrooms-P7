import { Link, useRouteError } from 'react-router-dom'

export const ErrorPage = () => {
  const error = useRouteError()
  console.log(error)

  return (
    <div id='error-page' className='grid place-items-center'>
      <h1> We have encountered an error. </h1>
      <p> Our team is working on a quick fix</p>
      <img src='error.svg' alt='error on page' className=' w-96' />
      <p>
        In the mean time please go to our{' '}
        <strong>
          <Link to='/'>Home page</Link>
        </strong>
      </p>
    </div>
  )
}
