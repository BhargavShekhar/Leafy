import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function Post({ $id, name, featuredImage }) {
    return (
        <Link
            to={`/plant/${$id}`}
            className='border  overflow-hidden 2xl:h-[56vh] 2xl:w-[22%] h-[40vh] w-[74%] mx-3 my-4 2xl:rounded-3xl rounded-xl shadow-md  hover:shadow-black  border-cyan-900 border-b-4 hover:brightness-110 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group'>

            <h1 className='text-2xl text-white p-2 bg-gray-700 shadow-2xl shadow-black'>{name}</h1>

            <img
                src={service.getFilePreview(featuredImage)}
                alt="not found"
                className='h-full w-full object-cover object-center'
            />

        </Link>
    )
}

export default Post
