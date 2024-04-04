import IndiviualBlog from '@/components/IndiviualBlog'
import React from 'react'

export default function page({params}:any) {
  return (
    <div>
        <IndiviualBlog id={params}/>
    </div>
  )
}
