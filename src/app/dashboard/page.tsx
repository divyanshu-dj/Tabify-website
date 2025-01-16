import { redirect } from 'next/navigation';
import React from 'react'
import { checkIsAuth } from '@/components/auth/checkIsAuth'
import Hero from '../../components/dashboard/hero'


const Dashboard: React.FC = async() => {
    const isAuth = await checkIsAuth();
    if ( !isAuth ) {
      redirect("/api/auth/signin")
    } else {
      return (
          <Hero />
      )
    }
  }
  
  export default Dashboard