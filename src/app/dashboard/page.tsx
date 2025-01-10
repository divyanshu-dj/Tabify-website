import { redirect } from 'next/navigation';
import DashboardPage from './dashboard'
import React from 'react'
import { checkIsAuth } from '@/components/auth/checkIsAuth'


const Dashboard: React.FC = async() => {
    const isAuth = await checkIsAuth();
    if ( !isAuth ) {
      redirect("/api/auth/signin")
    } else {
      return (
        <DashboardPage />
      )
    }
  }
  
  export default Dashboard