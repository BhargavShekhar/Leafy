import React from 'react'
import { useEffect, useState } from 'react'
import Post from './Post'
import appwriteService from '../appwrite/config'
import Hamster from './Animations/Hamster'

function Home() {
    // const dispatch = useDispatch()

    // Shifted this to App
    // useEffect(() => {
    //     // check if user is login
    //     authService.getCurrentUser()
    //         .then((userData) => {
    //             if (userData) {
    //                 // dispatch in store to update reducer
    //                 dispatch(login({ userData }))
    //             }
    //             else {
    //                 dispatch(logout())
    //             }
    //         })
    //         .finally(() => setLoading(false))
    // }, [])

    // get all post

    const [loading, setLoading] = useState(false)
    const [posts, setPost] = useState([])

    useEffect(() => {
        appwriteService.getPost([]).then((posts) => {
            if (posts) {
                setPost(posts.documents)
                setLoading(true)
            }
            // console.log(posts);
        })
    }, [])

    return (
        loading ?
            <>
                <h1 className='text-center text-4xl font-normal from-neutral-700 py-4 px-2'>
                    Leafy: Planting the Seeds of Knowledge
                </h1>
                <main className='min-h-[70vh] py-4 flex flex-wrap text-center justify-center'>
                    {/* <Post />  bg-teal-300/5 bg-gradient-to-t from-teal-300/55 to-[#8bfcfe0e] shadow-md  */}

                    {posts.map((post) => (
                        <Post key={post.$id} {...post} />
                    ))}

                </main>
            </> :
            <div className='flex justify-center items-center'>
                <Hamster />
            </div>
    )
}

export default Home
