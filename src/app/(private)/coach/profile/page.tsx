'use client'

import React from 'react'
import ProfilePicture from './ProfilePicture'
import Password from './Password'
import BasicInfo from './BasicInfo'
import { api } from "@/trpc/react";

const page = () => {
    const {
        data: userDetails,
        isLoading,
        error,
    } = api.user.getOne.useQuery({ id: 'me' });

    return (
        <div className='container flex gap-4 pt-4'>
            <div className='flex flex-col gap-4 w-1/3'>
                <ProfilePicture isLoading={isLoading} data={userDetails ?? null} />
                <Password isLoading={isLoading} userId={userDetails?.id ?? ''} />
            </div>
            <div className='flex flex-col gap-4 w-2/3'>
                <BasicInfo isLoading={isLoading} data={userDetails ?? null} />
            </div>
        </div>
    )
};

export default page;