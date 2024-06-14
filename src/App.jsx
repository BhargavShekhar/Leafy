import { Outlet } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'

function App() {
  // const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    // check if user is login
    authService.getCurrentUser()
        .then((userData) => {
            if (userData) {
                // dispatch in store to update reducer
                dispatch(login({ userData }))
            }
            else {
                dispatch(logout())
            }
        })
        // .finally(() => setLoading(false))
}, [])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
