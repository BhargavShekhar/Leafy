import React from 'react'
import { useEffect, useState } from 'react'
import Post from './Post'
import appwriteService from '../appwrite/config'
import Hamster from './Animations/Hamster'

function Home() {
    const [loading, setLoading] = useState(false)
    const [posts, setPost] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPost(posts.documents)
                setLoading(true)
            }
            console.log(posts);
        })
    }, [])

    return (
        loading ?
            <div>
                <h1 className='text-center text-5xl text-yellow-900 dancing-script underline underline-offset-8 decoration-2 pt-9 px-2 bg-gradient-to-b from-cyan-400/5 hover:text-yellow-700'>
                    PhenoApp, Accelerating Plant Science !
                </h1>
                <main className='min-h-[70vh] py-4 flex flex-wrap text-center justify-center micro-5-charted-regular'>
                    {posts.map((post) => (
                        <Post key={post.$id} {...post} />
                    ))}

                </main>
            </div> :
            <div className='h-[70vh] flex justify-center items-center'>
                <Hamster />
            </div>
    )
}

export default Home
