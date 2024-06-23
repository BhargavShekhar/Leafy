import React from 'react'
import './Contact.css'
import { Link } from 'react-router-dom'

function Contact() {
  return (
    <div>

      <div
        className='h-[120vh] p-2'
        style={
          {
            backgroundImage: `url(https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=600`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }
        }
      >

        <div className="row">
          <h1 className='text-center text-black font-semibold text-7xl underline py-3 dancing-script bg-gray-300/10'>Contact Us</h1>
        </div>
        <div className="row">
          <h4 className='text-black text-4xl dancing-script' style={{ textAlign: 'center' }}>We'd love to hear from you!</h4>
        </div>

        <div className="row input-container dancing-script">
          <div className="col-xs-12">
            <div className="styled-input wide border border-opacity-80 border-black shadow-xl shadow-cyan-300/40">
              <input type="text" required />
              <label>Name</label>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="styled-input border border-opacity-85 border-black shadow-xl shadow-cyan-300/40">
              <input type="text" required />
              <label>Email</label>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="styled-input border border-opacity-85 border-black shadow-xl shadow-cyan-300/40" style={{ float: 'right' }}>
              <input type="text" required />
              <label>Phone Number</label>
            </div>
          </div>
          <div className="col-xs-12">
            <div className="styled-input wide border border-opacity-85 border-black shadow-xl shadow-green-300/40">
              <textarea required></textarea>
              <label>Message</label>
            </div>
          </div>
          <div className="col-xs-12">
            <Link to={'/'}>
              <div className="btn-lrg submit-btn bg-gray-200 text-black font-bold border border-gray-700 border-b-4 overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span
                  className="bg-green-900 shadow-cyan-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"
                >
                </span>
                Send Message
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact
