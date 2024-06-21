"use client";
import React from 'react'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Profile:React.FC = () => {
  const { data: session, status } = useSession();

  if (!session) {
    redirect('/api/auth/signin');
  }
  return (
    <div className='h-screen'>Profile</div>
  )
}

export default Profile