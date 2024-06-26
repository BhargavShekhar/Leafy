'use client'

import React from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

import logo from '../../assets/logo.png'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const nav = useNavigate()
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  const handleLogin = () => {
    nav('/login')
  }

  const handleSignup = () => {
    nav('/signup')
  }

  const menuItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'About',
      slug: '/about',
      active: true
    },
    {
      name: 'Contact',
      slug: '/contact-us',
      active: true
    },
    {
      name: "Add Post",
      slug: "/addpost",
      active: authStatus,
    },
  ]

  return (
    <div className="relative w-full bg-white border-cyan-900 border-b shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <img className='h-16 object-cover object-top' src={logo} alt="reload" />
          </span>
          <span className="py-1 font-bold text-xl text-green-900 shadow-lg shadow-yellow-300 rounded-md  hover:brightness-150">PhenoApp</span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              item.active ?
                <li key={item.name}>
                  <Link
                    to={item.slug}
                    className="py-2 px-2 font-bold text-black rounded-lg hover:text-green-800 border-b hover:border-t border-dotted border-black shadow-md"
                  >
                    {item.name}
                  </Link>
                </li> : null
            ))}
          </ul>
        </div>
        <div className="hidden lg:block">
          {authStatus &&
            <button
              type="button"
              className="bg-gray-200 text-black font-bold border border-gray-700 border-b-4 overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
              onClick={handleLogout}
            >
              <span
                className="bg-green-900 shadow-cyan-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"
              ></span>
              Logout
            </button>}

          {!authStatus &&
            <button
              type="button"
              className="bg-gray-200 text-black font-bold border border-gray-700 border-b-4 overflow-hidden relative px-3 py-2 mr-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
              onClick={handleSignup}
            >
              <span
                className="bg-green-900 shadow-cyan-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"
              ></span>
              Signup
            </button>}

          {!authStatus &&
            <button
              type="button"
              className="bg-gray-200 text-black font-bold border border-gray-700 border-b-4 overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
              onClick={handleLogin}
            >
              <span
                className="bg-green-900 shadow-cyan-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"
              ></span>
              Login
            </button>}

        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden dancing-script">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <img className='h-16 object-cover object-top' src={logo} alt="reload" />
                    </span>
                    <span className="font-extrabold text-2xl bg-green-200/10 p-1 rounded-xl">PhenoApp</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      item.active ?
                        <Link
                          key={item.name}
                          to={item.slug}
                          className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                        >
                          <span className="ml-3 text-lg font-medium text-gray-900 rounded-lg p-1">
                            {item.name}
                          </span>
                        </Link> : null
                    ))}
                  </nav>
                </div>
                {
                  authStatus &&
                  <button
                    type="button"
                    className="bg-gray-900 text-white font-bold border border-gray-400 border-b-4 overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group w-full mt-4"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                }

                {
                  !authStatus &&
                  <button
                    type="button"
                    className="bg-gray-900 text-white font-bold border border-gray-400 border-b-4 overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group w-full mt-4"
                    onClick={handleSignup}
                  >
                    Signup
                  </button>
                }
                {
                  !authStatus &&
                  <button
                    type="button"
                    className="bg-gray-900 text-white font-bold border border-gray-400 border-b-4 overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group w-full mt-4"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                }

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
