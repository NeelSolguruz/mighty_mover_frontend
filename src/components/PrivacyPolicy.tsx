import React from 'react'
import { PRIVACY_POLICY } from '@/constant/constant'

export default function PrivacyPolicy() {
    return (
        <>
            <div>
                <div className='bg-black w-full h-52 flex justify-center'>
                    <h1 className='text-white text-4xl font-bold mt-10'>{PRIVACY_POLICY.title}</h1>
                </div>
                <div className='flex justify-center h-[2000px]'>
                    {/* multiple paragraph section */}
                    <div className='absolute bg-white w-10/12 shadow-lg top-[200px] rounded-lg p-10 flex flex-col gap-4'>
                        {PRIVACY_POLICY.multiple_para.map((item, index) => (
                            <p key={index}>{item.paragraph}</p>
                        ))}
                        <div>
                            <h1 className='font-semibold'>{PRIVACY_POLICY.what_we_collect}</h1>
                        </div>
                        <div>
                            <p>{PRIVACY_POLICY.what_we_collect_desc}</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            {PRIVACY_POLICY.what_we_collect_list.map((item, index) => (
                                <li key={index}>{item.text}</li>
                            ))}
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
