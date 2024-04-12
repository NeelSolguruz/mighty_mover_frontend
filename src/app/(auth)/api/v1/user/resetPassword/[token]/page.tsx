
import NewPassword from '@/components/NewPassword'
import React from 'react'

export default function page({params}:any) {
  return (
    <div>
      <NewPassword id={params.token} />
    </div>
  )
}
