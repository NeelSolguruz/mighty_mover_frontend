import BlogFooter from '@/components/BlogFooter'
import BlogNavbar from '@/components/BlogNavbar'
import React from 'react'
// import "@/app/globals.css"
const layout = ({ children }: any) => {
    return (
        <div>
            <div className='sticky top-[0px] z-[1000]'>

            <BlogNavbar/> 
            </div>
            {children}
            <BlogFooter/>
        </div>
    )
}

export default layout
