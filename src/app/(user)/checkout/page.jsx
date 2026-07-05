import { getMe } from '@/api/auth-server'
import Checkout from '@/components/user/Checkout'
import React from 'react'
export const dynamic = "force-dynamic";


export default async function page() {

  const {user} = await  getMe();
  return (
    <Checkout user={user}/>
  )
}
