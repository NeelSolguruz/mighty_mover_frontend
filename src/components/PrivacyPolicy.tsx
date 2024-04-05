import React from 'react'
import { PRIVACY_POLICY } from '@/constant/PrivacyPolicy' 

export default function PrivacyPolicy() {
    return (
        <>
            <div>
                <div className='bg-black w-full h-52 flex justify-center'>
                    <h1 className='text-white text-4xl font-bold mt-10'>{PRIVACY_POLICY.title}</h1>
                </div>
                <div className='flex justify-center'>
                    {/* multiple paragraph section */}
                    <div className='mt-[-7%] mb-[2%] max-lg:mt-[-10%] max-sm:mt-[-20%] bg-white w-11/12 shadow-lg rounded-lg p-10 flex flex-col gap-4'>
                        {PRIVACY_POLICY.multiple_para.map((item, index) => (
                            <p key={index} className='text-sm'>{item.paragraph}</p>
                        ))}



                        <div className='flex flex-col gap-4 items-center'>
                            <div className='w-full'>
                                <h1 className='font-bold'>{PRIVACY_POLICY.what_we_collect}</h1>
                            </div>
                            <div className='w-full'>
                                <p className='text-sm'>{PRIVACY_POLICY.what_we_collect_desc}</p>
                            </div>
                            <div className='flex flex-col gap-3 w-11/12'>
                                {PRIVACY_POLICY.what_we_collect_list.map((item, index) => (
                                    <li key={index} className='text-sm'>{item.text}</li>
                                ))}
                            </div>
                        </div>



                        <div>
                            <h1 className="font-bold">{PRIVACY_POLICY.information}</h1>
                        </div>
                        <div>
                            <p className='text-sm'>{PRIVACY_POLICY.information_desc}</p>
                        </div>

                        <div className='flex flex-col items-center gap-4'>
                            {/* INTERNAL RECORD KEEPING */}
                            <div className='w-11/12 flex flex-col items-center gap-4'>
                                <div className="w-full flex flex-col gap-4">
                                    <li className='text-sm font-bold '>{PRIVACY_POLICY.internal_record_keeping}</li>
                                    <p className='text-sm'>{PRIVACY_POLICY.internal_record_keeping_desc}</p>
                                    <div className='w-full flex justify-center'>
                                        <div className='w-11/12 flex flex-col gap-3'>
                                            {PRIVACY_POLICY.internal_record_list.map((item, index) => (
                                                <li key={index} className='text-sm list-[circle]'>{item.text}</li>
                                            ))}
                                        </div>
                                    </div>
                                    <p className='text-sm'>{PRIVACY_POLICY.internal_record_keeping_desc2}</p>
                                    <p className='text-sm'>{PRIVACY_POLICY.internal_record_keeping_desc3}</p>
                                    <p className='text-sm'>{PRIVACY_POLICY.internal_record_keeping_desc4}</p>
                                </div>
                            </div>

                            <div className='w-11/12 flex flex-col items-center gap-4'>
                                <div className="w-full flex flex-col gap-4">
                                    <li className='text-sm font-bold '>{PRIVACY_POLICY.security}</li>
                                    <p className='text-sm'>{PRIVACY_POLICY.security_para}</p>
                                </div>
                            </div>

                            {/* DISCLOSURE */}
                            <div className='w-11/12 flex flex-col items-center gap-4'>
                                <div className="w-full flex flex-col gap-4">
                                    <li className='text-sm font-bold '>{PRIVACY_POLICY.disclosure}</li>
                                    <p className='text-sm'>{PRIVACY_POLICY.disclosure_desc1}</p>
                                    <div className='w-full flex justify-center'>
                                        <div className='w-11/12 flex flex-col gap-3'>
                                            {PRIVACY_POLICY.disclosure_list1.map((item, index) => (
                                                <li key={index} className='text-sm list-[circle]'>{item.text}</li>
                                            ))}
                                        </div>
                                    </div>
                                    <p className='text-sm'>{PRIVACY_POLICY.disclosure_desc2}</p>
                                    <div className='w-full flex justify-center'>
                                        <div className='w-11/12 flex flex-col gap-3'>
                                            {PRIVACY_POLICY.disclosure_list2.map((item, index) => (
                                                <li key={index} className='text-sm list-[circle] '>
                                                    {item.text}
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col items-center gap-4'>
                            <div className='w-full'>
                                <h1 className='font-bold'>{PRIVACY_POLICY.prohibited_activities}</h1>
                            </div>
                            <div>
                                <p className='text-sm'>{PRIVACY_POLICY.prohibited_activites_desc}</p>
                            </div>
                            <div className='flex flex-col gap-3 w-11/12'>
                                {PRIVACY_POLICY.prohibited_activites_list.map((item, index) => (
                                    <li key={index} className='text-sm'>{item.text}</li>
                                ))}
                            </div>
                            <div>
                                <p className='text-sm'>{PRIVACY_POLICY.prohibited_activities_desc2}</p>
                            </div>
                        </div>

                        <div>
                            <h1 className='font-bold'>{PRIVACY_POLICY.withdrawal_non_provition}</h1>
                        </div>
                        <div>
                            <p className='text-sm'>{PRIVACY_POLICY.withdrawal_non_provition_para}</p>
                        </div>

                        <div>
                            <h1 className='font-bold'>{PRIVACY_POLICY.cookies}</h1>
                        </div>
                        <div className='flex flex-col gap-4'>
                            {PRIVACY_POLICY.cookies_para_list.map((item, index) => (
                                <p key={index} className='text-sm'>{item.para}</p>
                            ))}
                        </div>


                        <div>
                            <h1 className='font-bold'>{PRIVACY_POLICY.link}</h1>
                        </div>
                        <div className='flex flex-col gap-4'>
                            {PRIVACY_POLICY.link_list.map((item, index) => (
                                <p key={index} className='text-sm'>{item.para}</p>
                            ))}
                        </div>

                        <div>
                            <h1 className='font-bold'>{PRIVACY_POLICY.contact}</h1>
                        </div>
                        <div>
                            <p className='text-sm'>{PRIVACY_POLICY.contact_para}</p>
                        </div>


                        <div>
                            <h1 className='font-bold'>{PRIVACY_POLICY.grievance}</h1>
                        </div>
                        <div>
                            <p className='text-sm'>{PRIVACY_POLICY.grievance_desc}</p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            {PRIVACY_POLICY.grievance_list.map((item, index) => (
                                <p key={index} className='text-sm'>{item.text}</p>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
