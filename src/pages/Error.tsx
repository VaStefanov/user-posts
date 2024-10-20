import { Link } from "react-router-dom"

const Error = () => {
  return (
    <main className='error-page'>
      <div>
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to='/'>back home</Link>
      </div>
    </main>
  )
}
export default Error