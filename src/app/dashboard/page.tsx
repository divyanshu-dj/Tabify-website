import LeftSidebar from '../../components/dashboard/leftSidebar'
import Hero from '../../components/dashboard/hero'

const Dashboard = () => {
    return (
      <div className='h-screen flex'>
        <div className="w-1/6">
            <LeftSidebar />
        </div>
        <div className="w-5/6">
            <Hero />
        </div>
      </div>
    )
  }
  
  export default Dashboard