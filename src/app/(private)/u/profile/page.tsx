// 'use client'

// import React from 'react'
// import ProfilePicture from './ProfilePicture'
// import Password from './Password'
// import BasicInfo from './BasicInfo'
// import { api } from "@/trpc/react";

// const page = () => {
//     const {
//         data: userDetails,
//         isLoading,
//         error,
//     } = api.user.getOne.useQuery({ id: 'me' });

//     return (
//         <div className='container flex gap-4 pt-4'>
//             <div className='flex flex-col gap-4 w-1/3'>
//                 <ProfilePicture isLoading={isLoading} data={userDetails ?? null} />
//                 <Password isLoading={isLoading} userId={userDetails?.id ?? ''} />
//             </div>
//             <div className='flex flex-col gap-4 w-2/3'>
//                 <BasicInfo isLoading={isLoading} data={userDetails ?? null} />
//             </div>
//         </div>
//     )
// };

// export default page;

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { api } from '@/trpc/react';
import ProfileBasicInfo from '../components/profile/ProfileBasicInfo';
import ProfileEducation from '../components/profile/ProfileEducation';
import ProfileCareer from '../components/profile/ProfileCareer';
import ProfileGoals from '../components/profile/ProfileGoals';
import ProfileCertifications from '../components/profile/ProfileCertifications';
import ProfileResume from '../components/profile/ProfileResume';
import BasicInfo from './BasicInfo';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('basic');

  const {
    data: userDetails,
    isLoading,
    error,
  } = api.user.getOne.useQuery({ id: 'me' });

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="career">Career</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols- gap-8">
            <TabsContent value="basic">
              
              <ProfileBasicInfo isLoading={isLoading} data={userDetails ?? null} />
              
            </TabsContent>
            <TabsContent value="education">
              <ProfileEducation isLoading={isLoading} data={userDetails ?? null} />
            </TabsContent>
            <TabsContent value="career">
              <ProfileCareer isLoading={isLoading} data={userDetails ?? null} />
            </TabsContent>
            <TabsContent value="goals">
              <ProfileGoals isLoading={isLoading} data={userDetails ?? null} />
            </TabsContent>
            <TabsContent value="certifications">
              <ProfileCertifications isLoading={isLoading} data={userDetails ?? null} />
            </TabsContent>
            <TabsContent value="resume">
              <ProfileResume isLoading={isLoading} data={userDetails ?? null}  />
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
}
