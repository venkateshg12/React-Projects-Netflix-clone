import React from 'react'
import { askedQuestions, reasons } from '../utils';
import plus from "../assets/plus.png"

const Reasons = () => {
    return (
        <div className='w-full py-10'>
            <h1 className="text-2xl  font-bold mb-7">More reasons to join</h1>
            <div className="relative">
                <ul className="grid xl:grid-cols-4 grid-cols-1 lg:grid-cols-2  gap-4">
                    {reasons.map((item) => (
                        <div key={item.id} className="min-w-[3rem] md:w-full min-h-[3rem] p-3 flex-wrap flex flex-col bg-linear-to-b from-[#1a2043] to-[#1f1221] rounded-lg ">
                            <h3 className="font-bold text-2xl my-4">{item.title}</h3>
                            <span className="text-neutral-400 mb-3">{item.description}</span>
                            <figure className="mt-auto ml-auto">
                                <img src={item.imageUrl} alt={item.imageUrl} width={50} height={50} />
                            </figure>
                        </div>
                    ))}
                </ul>
            </div>
            <h1 className="md:text-2xl my-7 font-bold mb-7">Frequently Asked Questions</h1>
            <div className='w-full'>
                <div className=" space-y-3 flex flex-col items-center">
                    {askedQuestions.map((item) => (
                        <span key={item.id} className="w-full hover:bg-neutral-600  cursor-pointer container md:p-5 p-2 flex justify-between bg-neutral-800 " >{item.title}
                            <figure>
                                <img src={plus} alt="plus" width={35} className="md:w-[2rem] w-[1rem]" />
                            </figure>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Reasons;