import { getMe } from '@/api/server-api'
import Checkout from '@/components/user/Checkout'
import React from 'react'

export default async function page() {

  const {user} = await  getMe();
  return (
    <Checkout user={user}/>
  )
}
