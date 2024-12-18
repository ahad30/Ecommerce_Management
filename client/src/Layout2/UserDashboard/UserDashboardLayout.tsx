import { Outlet } from 'react-router-dom'

const UserDashboardLayout = () => {
  return (

    <div> 
     <div><Outlet></Outlet></div>
    </div>
  )
}

export default UserDashboardLayout