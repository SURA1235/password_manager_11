import React from 'react'

import { IoCopy } from "react-icons/io5";

const Card = ({ item, handleDeleteClick, copyText }) => (

    <div className="flex h-[30rem] w-[50rem] bg-[#1a1a1a] p-5 overflow-hidden pass ">

        <div className="w-[25vw] h-[55vh]  rounded-2xl bg-[#333333] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] pass overflow-hidden">
            <h1 className=" text-4xl text-center font-bold text-[#4ecdc4] drop-shadow-[0_0_20px_rgba(78,205,196,0.3)] mb-5 overflow-hidden ">
                password</h1>

            <p className="text-lg font-bold text-white overflow-hidden pass">website: {item.site}</p>
            <IoCopy size={20} onClick={() => copyText(item.site)} className=" cursor-pointer " />



            <p className="text-lg font-bold text-white overflow-hidden pass">username: {item.password}</p>
            <IoCopy size={20} onClick={() => copyText(item.password)} className=" cursor-pointer " />

            <p className="text-lg font-bold text-white overflow-hidden pass">password: {item.username}</p>
            <IoCopy size={20} onClick={() => copyText(item.username)} className=" cursor-pointer " />

            <button className=" inline-block transform overflow-hidden rounded-lg px-8 py-3 text-base font-bold
                               text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:text-white
                                 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] ml-16 " onClick={() => handleDeleteClick(item._id || item.id)}>
                <span className="animate-gradient absolute inset-0 z-[-2] rounded-lg bg-gradient-to-r from-[#ff6b6b] via-[#4ecdc4] to-[#feca57] bg-[length:400%_400%]" />
                <span className="absolute inset-[2px] z-[-1] rounded-md bg-[#2a2a2a]" />
                Delete
            </button>
        </div>
    </div>
);


export default Card