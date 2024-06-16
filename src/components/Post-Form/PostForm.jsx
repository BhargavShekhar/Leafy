import React, { useEffect, useId, useRef, useState } from 'react'
import { SquareMinus } from 'lucide-react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import appwriteService from '../../appwrite/config'
import { useSelector } from 'react-redux';
import Hamster from '../Animations/Hamster';
import bgImage from '../../assets/postFormBg.jpg'

function PostForm({ post }) {
  // const [position, setPosition] = useState({ latitude: null, longitude: null })
  const nav = useNavigate()
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       setPosition({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude
  //       })
  //     })
  //   }
  //   else {
  //     console.log("Can not access your location");
  //   }
  // }, [])

  // TODO Use it in images map instead of index
  const id = useId();

  const [images, setImages] = useState([]);
  const [isDraging, setIsDraging] = useState(false);
  const fileInputRef = useRef(null);

  // TODO Remove this
  // const selectFiles = () => {
  //   fileInputRef.current.click()
  // }

  const onFileSelect = (event) => {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') {
        continue;
      }
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i])
          }
        ])
      }
    }
  }

  const deleteImage = (index) => {
    setImages((preevImages) =>
      preevImages.filter((_, i) => i != index)
    )
  }

  const onDragOver = (e) => {
    e.preventDefault()
    setIsDraging(true)
    e.dataTransfer.dropEffect = 'copy'
  }

  const onDragLeave = (e) => {
    e.preventDefault()
    setIsDraging(false)
  }

  const onDrop = (e) => {
    e.preventDefault();
    setIsDraging(false);
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.split('/')[0] === 'image');
    const newImages = imageFiles.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setImages(prevImages => [
      ...prevImages,
      ...newImages.filter(file => !prevImages.some(img => img.name === file.name))
    ]);
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: post?.name || '',
      // slug: post?.$id || '',
      type: post?.type || '',
      habitat: post?.habitat || '',
      temp: post?.temp || '',
      season: post?.season || '',
    }
  })

  const userData = useSelector(state => state.auth.userData)

  const submit = async (data) => {
    // const date = moment().format('DD MM YYYY')
    // const time = moment().format('hh:mm:ss')
    // console.log('Images: ', images);
    // console.log('Day of upload:', date);
    // console.log('time of upload:', time);
    // console.log(position.latitude);
    // console.log(position.longitude);
    // nav('/')
    console.log('Postform :: data ->');
    console.log(data);

    // console.log(data.images[0]);
    // for (let index = 0; index < data.images.length; index++) {
    //   const image = data.images[index];
    //   await appwriteService.uploadFile(image)
    // }

    setLoading(true)

    const file = await appwriteService.uploadFile(data.images[0])

    if (data.images.length > 1) {
      var file1 = await appwriteService.uploadFile(data.images[1])
    }

    if (data.images.length > 2) {
      var file2 = await appwriteService.uploadFile(data.images[2])
    }

    if (data.images.length > 3) {
      var file3 = await appwriteService.uploadFile(data.images[3])
    }

    if (data.images.length > 4) {
      var file4 = await appwriteService.uploadFile(data.images[4])
    }

    console.log('Postform :: file ->');
    console.log(file);

    console.log('Postform :: userData ->');
    console.log(userData);

    if (file) {

      console.log('file id is ->');
      console.log(file.$id);

      const fileId = file.$id
      data.featuredImage = fileId

      if (file1) {
        const fileId1 = file1.$id
        data.image1 = fileId1
      }

      if (file2) {
        const fileId2 = file2.$id
        data.image2 = fileId2;
      }

      if (file3) {
        const fileId3 = file3.$id
        data.image3 = fileId3
      }

      if (file4) {
        const fileId4 = file4.$id
        data.image4 = fileId4
      }

      const dbPost = await appwriteService.createPost({
        ...data,
        userid: userData.$id
      })

      if (dbPost) {
        setLoading(false)
        nav('/')
        console.log('success');
      }

      else {
        setLoading(false)
        nav('/addPost')
        console.log('failed');
      }

    }
  }

  return (!loading ?
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className='h-[100vh] w-[100vw] px-8 py-5 flex flex-wrap justify-center items-center gap-12 bg-no-repeat bg-cover bg-center'
        style={
          { backgroundImage: `url(${bgImage})`, }
        }
      >

        <div className='2xl:w-3/5 w-[100%] bg-white/5 backdrop-blur-sm border shadow-lg shadow-black border-black rounded-lg px-4 py-2 flex flex-col justify-center items-center'>

          <h2 className='text-blue-600 font-bold'>Upload your Images here</h2>

          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className='p-4 m-2 2xl:w-full w-[90%] border border-dashed border-blue-900 rounded-lg bg-blue-200 h-36 flex items-center justify-center'
          >

            {isDraging ? (
              <span className='text-blue-700'>Drop Images here</span>
            ) : (
              <>
                <span className='text-blue-700 p-2'>Drag and drop image here or {" "}</span>
                {/* <span className='text-slate-800' role='button' onClick={selectFiles} >Browse</span> */}
              </>
            )}

            <input
              type="file"
              multiple={true}
              ref={fileInputRef}
              {...register('images')}
              onChange={onFileSelect}
              accept='image/png, image/jpg, image/jpeg, image/gif'
              className='py-2 px-2 rounded-lg bg-cyan-900 text-white'
            />

          </div>

          <div className='container min-h-24 max-w-[100%] mb-3 flex flex-wrap gap-2'>
            {images.length === 0 ? (
              <h1 className='text-xl text-cyan-900'>*Please Upload Full part of the plant along with there different parts</h1>
            ) : null
            }
            {images.map((images, index) => (
              <div className='image border h-24 max-w-20 bg-yellow-200 flex justify-end' key={index}>
                <span className='delete absolute cursor-pointer text-red-600 bg-red-200' onClick={() => deleteImage(index)}>
                  <SquareMinus />
                </span>
                <img src={images.url} alt={images.name} className='h-full w-screen border border-red-950' />
              </div>
            ))}
          </div>


          <div className='w-full rounded-lg px-4 py-1 mb-4 flex justify-center items-center gap-4' >
            <label htmlFor={id} className='inline-block pl-1 mx-1 w-12'>Name: </label>
            <input
              type="text"
              placeholder='Enter Your name'
              className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-black w-4/5'
              {...register('name', { required: true })}
            />
          </div>

          <div className='w-full rounded-lg px-4 py-1 mb-4 flex justify-center items-center gap-4' >
            <label htmlFor={id} className='inline-block pl-1 mx-1 w-12'>Type: </label>
            <input
              type="text"
              placeholder='herb, shrub, climber , tree , other'
              className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-black w-4/5'
              {...register('type', { required: true })}
            />
          </div>

          <div className='w-full rounded-lg px-4 py-1 mb-4 flex justify-center items-center gap-4' >
            <label htmlFor={id} className='inline-block pl-1 mx-1 w-12'>Habitat: </label>
            <input
              type="text"
              placeholder='agri field, orchard, forest, garden, other'
              className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-black w-4/5'
              {...register('habitat', { required: true })}
            />
          </div>

          <div className='w-full rounded-lg px-4 py-1 mb-4 flex justify-center items-center gap-4' >
            <label htmlFor={id} className='inline-block pl-1 mx-1 w-12'>Temp: </label>
            <input
              type="number"
              placeholder='in &deg;celsius'
              className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-black w-4/5'
              {...register('temp', { required: true })}
            />
          </div>

          <div className='w-full rounded-lg px-4 py-1 mb-4 flex justify-center items-center gap-4' >
            <label htmlFor={id} className='inline-block pl-1 mx-1 w-12'>Season: </label>
            <input
              type="text"
              placeholder='Spring, Summer, Monsoon, Autumn, Winter'
              className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-black w-4/5'
              {...register('season', { required: true })}
            />
          </div>

          <button className='px-4 py-2 w-full rounded-lg border border-gray-900 text-white bg-blue-500 hover:bg-blue-600/95'>
            Submit
          </button>

        </div>

      </form>
    </> :
    <div className='flex justify-center items-center'>
      <Hamster />
    </div>


    // <input type="file" className='mb-4 bg-white py-2 px-2 rounded-md' accept='image/png, image/jpg, image/jpeg, image/gif' />
    // <label htmlFor={id} className='inline-block mb-1 pl-1'>Part of a Plant:</label>
    // <div>
    //   <h2>Your Current Location is</h2>
    //   {position.latitude && position.longitude ?
    //     (
    //       <p>Latitude: {position.latitude}, Longitude: {position.longitude}</p>
    //     ) :
    //     (
    //       <p>Loading ...</p>
    //     )
    //   }
    // </div>
  )
}

export default PostForm
