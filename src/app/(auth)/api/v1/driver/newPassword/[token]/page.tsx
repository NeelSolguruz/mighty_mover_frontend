import DriverNewPassword from '@/components/DriverNewPassword' 
import React from 'react'

export default function page({ params }: any) {
    return (
        <div>
            <DriverNewPassword id={params.token} />
        </div>
    )
}