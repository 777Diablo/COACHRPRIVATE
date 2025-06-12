'use client'

import { type GetOneUserResponse } from '@/types'
import { HiSkeleton } from '@hidstech/common_components'
import { Avatar, AvatarFallback, AvatarImage } from '@hidstech/common_components/components/ui/avatar.js'
import React from 'react'

const ProfilePicture = ({ isLoading, data }: { isLoading: boolean, data: GetOneUserResponse }) => {
  return (
    <div className='section_card'>
      {isLoading ? (
        <HiSkeleton className="w-[200px] h-[200px]" />
      ) : (
        <Avatar className='w-[200px] h-[200px] rounded'>
          <AvatarImage src={data?.image ?? undefined} />
          <AvatarFallback className='text-2xl rounded'>{data?.name?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

export default ProfilePicture;