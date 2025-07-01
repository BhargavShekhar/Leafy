import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function Post({ $id, name, featuredImage }) {
    return (
        <Link
            to={`/plant/${$id}`}
            className='border overflow-hidden 2xl:h-[56vh] 2xl:w-[22%] xl:h-[56vh] xl:w-[22%] lg:h-[56vh] lg:w-[37%] h-[30vh] w-[74%] mx-3 my-4 2xl:rounded-3xl rounded-xl shadow-md  hover:shadow-black  border-cyan-800 border-b-8 hover:brightness-110 hover:border-t-8 hover:border-b active:opacity-75 outline-none duration-300 group'>

            <h1 className='text-3xl text-yellow-100 p-2 mb-0 bg-gray-700 '>{name}</h1>

            <img
                src={service.getFilePreview(featuredImage)}
                alt="not found"
                className='h-full w-full object-cover object-center'
            />

        </Link>
    )
}

export default Post
