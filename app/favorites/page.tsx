"use client";
import React from 'react'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Favorites = () => {
  const { data: session, status } = useSession();

  if (!session) {
    redirect('/api/auth/signin');
  }
  return (
    <div>Favorites</div>
  )
}

export default Favorites