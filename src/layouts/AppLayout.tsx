import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/sidebar/Sidebar'
import { Topbar } from '../components/topbar/Topbar'

export function AppLayout() {
  return (
    <div className="h-full flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <Outlet />
      </div>
    </div>
  )
}
