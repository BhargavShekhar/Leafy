import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import Hamster from './Animations/Hamster'
import service from '../appwrite/config'

function PostDetail() {
    const { slug } = useParams()

    const [post, setPost] = useState(null)

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post)
            })
        }
    }, [slug])

    return (post ?
        <div className='border bg-slate-300/40 text-center 2xl:h-[120vh] flex'>
            <div className='border px-2 py-4 2xl:w-[57%] flex flex-col gap-2 overflow-scroll no-scrollbar'>
                {post.featuredImage ?
                    (
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            className='object-cover object-center'
                        />
                    ) : null
                }

                {post.image1 ?
                    (
                        <img
                            src={service.getFilePreview(post.image1)}
                            className='object-cover object-center'
                        />
                    ) : null
                }

                {post.image2 ?
                    (
                        <img
                            src={service.getFilePreview(post.image2)}
                            className='object-cover object-center'
                        />
                    ) : null
                }

                {post.image3 ?
                    (
                        <img
                            src={service.getFilePreview(post.image3)}
                            className='object-cover object-center'
                        />
                    ) : null
                }

                {post.image4 ?
                    (
                        <img
                            src={service.getFilePreview(post.image4)}
                            className='object-cover object-center'
                        />
                    ) : null
                }


            </div>
            <div className='border flex flex-col p-7 gap-12 justify-center items-center micro-5-charted-regular dancing-script'>
                <h1 className='2xl:text-6xl text-black ml-12'>Plant Name: {post.name}</h1>
                <h1 className='2xl:text-6xl text-black'>Type: {post.type}</h1>
                <h1 className='2xl:text-6xl text-black'>Habitatt: {post.habitat}</h1>
                <h1 className='2xl:text-6xl text-black'>Temp: {post.temp}&deg;C</h1>
                <h1 className='2xl:text-6xl text-black'>Season: {post.season}</h1>
            </div>
        </div>

        :

        <div className='h-[80vh] flex justify-center items-center'>
            <Hamster />
        </div>
    )
}

export default PostDetail
