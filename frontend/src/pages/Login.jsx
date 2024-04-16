import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/login", { email, password })
      setUser(res.data.info)
      localStorage.setItem("token", res.data.token)
      document.cookie = "token=" + res.data.token
      navigate("/")
    } catch (err) {
      setError(true)
      console.log(err)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-20 py-4 bg-teal-500">  {/* Added bg-teal-500 class for navbar background */}
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/" className="text-white hover:text-gray-200">  {/* Adjusted link color for contrast */}
            Blogs.com
          </Link>
        </h1>
        <h3>
          <Link to="/register" className="text-white hover:text-gray-200">  {/* Adjusted link color for contrast */}
            Register
          </Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-full md:w-1/2 bg-white rounded-lg shadow-md px-8 py-10">
          <h1 className="text-xl font-bold text-left color-teal-500">Log in to your account</h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 outline-0 focus:border-black"
            type="text"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 outline-0 focus:border-black"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-teal-500 rounded-lg hover:bg-teal-700 hover:text-white"
          >
            Log in
          </button>
          {error && <h3 className="text-red-500 text-sm">Something went wrong</h3>}
          <div className="flex justify-center items-center space-x-3">
            <p>New here?</p>
            <p className="text-gray-700 hover:text-black">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login
