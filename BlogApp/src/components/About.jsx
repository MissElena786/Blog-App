import React from 'react'
import Navbar from './Navbar'
import logo from "../assets/MmdcmmmcH.png"
import { Link } from 'react-router-dom'
import { MdMarkEmailUnread } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdAddLocationAlt } from "react-icons/md";
import insta from "../assets/insta.png"
import github from "../assets/github.png"
import linkedin from "../assets/linkedin.webp"


function About() {
  return (
    <>
    <div className='main min-h-screen pt-32 p-10 px-20'>

      <Navbar />

      <section>
        <div className='bg-gray-200  p-10'>
          <h1 className='text-center text-2xl m-3 mb-9 underline'>Blogs Application</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati, explicabo fuga fugit praesentium
            laudantium qui aliquam tempora incidunt repudiandae veritatis porro rem esse dolores sapiente ducimus
            voluptatibus soluta ex? Veniam!

          </p>
          <br />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam qui consectetur
            libero modi sunt tenetur adipisci expedita accusantium omnis, eum reiciendis
            libero modi sunt tenetur adipisci expedita accusantium omnis, eum reiciendis
            odit labore perferendis earum iusto reprehenderit voluptatibus cumque nam?</p>
          <br />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam qui consectetur
            libero modi sunt tenetur adipisci expedita accusantium omnis, eum reiciendis
            libero modi sunt tenetur adipisci expedita accusantium omnis, eum reiciendis
            odit labore perferendis earum iusto reprehenderit voluptatibus cumque nam Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci voluptatibus officia, esse odit optio similique culpa recusandae at quidem quas doloremque velit dolorem voluptas est nesciunt corrupti, reiciendis eaque consequatur.?</p>
          <br />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam qui consectetur
            libero modi sunt tenetur adipisci expedita accusantium omnis, eum reiciendis
            libero modi sunt tenetur adipisci expedita accusantium omnis, eum reiciendis
            odit labore perferendis earum iusto reprehenderit voluptatibus cumque nam?</p>
          <br />
          {/* <br />
              <br /> */}
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam qui consectetur
            libero modi sunt tenetur adipisci expedita accusantium omnis, eum reiciendis
            libero modi sunt tenetur adipisci expedita accusantium omnis, eum reiciendis
            odit labore perferendis earum iusto reprehenderit voluptatibus cumque nam?</p>
        </div>
      </section>
    </div>
      <footer className='footer bg-gray-700 p-6 text-white'>
       
        <div className='w-full text-lg '> 
          <div>
            <h1 className='text-2xl text-slate-300'>Blog Application</h1>
          </div>
          <div className=' flex gap-5 justify-around w-full ' >
          <div className='flex flex-col'>
       
            <h2 className='text-xl mb-2' >Links</h2>
            <Link to="/" className='text-blue-400'>Home</Link>
            <Link to="/about"  className='text-blue-400'>about</Link>
            <Link to="/profile"  className='text-blue-400'>Profile</Link>
            <Link  to="/my-blogs" className='text-blue-400'>My Blogs </Link>
            <Link  to="/likes" className='text-blue-400'>Likes</Link>
          </div>
          <div>
            <h2 className='text-xl mb-2'>Contact</h2>
            <div className='text-gray-300'>
              <p> <MdMarkEmailUnread className="text-green-600"/>  bgulnaz009@gmail.com</p>
              <p> <FaPhoneVolume className="text-green-600"/>  8302459017</p>
              <p> <MdAddLocationAlt className="text-green-600"/>   Jalmahal, Jaipur, Rajasthan</p>
            </div>
          
          </div>
            <div className=''>
              <h2  className='text-xl mb-2'>Get In Touch</h2>
              <Link to="https://www.instagram.com/elena_of_islam.786/" target='_blank'> <img  className=" w-14"src={insta} alt="" /></Link>
              <Link to="https://github.com/MissElena786"  target='_blank'><img  className=" w-14"src={github} alt="" /></Link>
              <Link to="https://www.linkedin.com/in/gulnaz-bano-3078a825b/"  target='_blank'>  <img  className=" w-14"src={linkedin} alt="" /></Link>
              
            
              
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default About
