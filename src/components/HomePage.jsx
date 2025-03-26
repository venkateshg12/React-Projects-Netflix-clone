import React, { useState } from 'react'
import Reasons from './Reasons'
import Initial from './Initial'
import Footer from './Footer'
import { Link } from 'react-router-dom'
const HomePage = () => {

    return (
        <>
            <Initial />
            <div className="absolute inset-0 flex items-center justify-center -mt-[1vh] md:-mt-0">
                <div className=" relative md:max-w-[42rem] max-w-sm text-center m-3 space-y-3 z-10 lg:-mt-0">
                    <h1 className=" lg:text-[3rem]  text-[2rem] font-code leading-[3rem] font-bold">Unlimited movies, TV shows&nbsp;and more</h1>
                    <h4 className="font-bold text-2rem" >Starts at ₹149. Cancel at any time.</h4>
                    <h6>Ready to watch? Enter your email to create or restart your membership.</h6>
                    <div className="flex flex-row gap-2 justify-center flex-wrap lg:mt-5 mt-0">
                        <input
                            type="text"
                            placeholder="Email address"
                            class="w-full sm:w-96 p-3 border border-n-2 bg-n-8 rounded-sm focus:outline-none  focus:ring-white focus:ring-1"
                        />
                        <Link to="/login">
                            <button className="w-40 md:w-52 cursor-pointer px-4 py-3 text-md md:text-lg font-bold text-white bg-red-500 rounded-sm flex justify-center items-center" >Get Started
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="ChevronRightStandard" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z" fill="currentColor"></path></svg>
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='-mt-[19vh] md:-mt-0 bg-[#07091a] h-full' >
                <div className="mx-[1rem] md:mx-[2rem]">
                    <div className="mx-auto lg:max-w-[75rem] ">
                        <Reasons />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default HomePage;