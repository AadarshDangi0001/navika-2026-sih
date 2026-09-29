import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, FolderKanban, PenTool, BarChart3,
  GitCompare, Box, FileText, Settings, HelpCircle, ChevronLeft, ChevronRight, Brain, Sparkles,
} from 'lucide-react'
import { useStore } from '../../store/useStore'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Overview' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/workspace', icon: PenTool, label: 'Site Workspace' },
  { to: '/analysis', icon: BarChart3, label: 'Analysis' },
  { to: '/proposals', icon: GitCompare, label: 'Proposals' },
  { to: '/intelligence', icon: Brain, label: 'Urban Intelligence' },
  { to: '/twin', icon: Box, label: 'Digital Twin' },
  { to: '/reports', icon: FileText, label: 'Reports' },
]

const bottomItems = [
  { icon: Settings, label: 'Settings' },
  { icon: HelpCircle, label: 'Help' },
]

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useStore()

  return (
    <aside
      className={`relative h-full flex flex-col bg-sidebar transition-all duration-200 ${
        sidebarCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent/[0.08] to-transparent" />

      <div className="relative h-14 flex items-center px-4 gap-2.5 border-b border-sidebar-border">
        <div className="w-7 h-7 rounded-[7px] bg-gradient-to-br from-accent to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_4px_10px_-2px_rgba(51,85,230,0.5)]">
          <span className="text-white text-[13px] font-bold tracking-tight">N</span>
        </div>
        {!sidebarCollapsed && (
          <span className="font-semibold text-[14px] tracking-tight text-white">Naivka</span>
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="ml-auto p-1 rounded-md hover:bg-white/[0.06] text-sidebar-text-dim hover:text-sidebar-text transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="relative flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto sidebar-scroll">
        {!sidebarCollapsed && (
          <p className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-sidebar-text-dim">
            Workspace
          </p>
        )}
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-2.5 py-[7px] rounded-lg text-[13px] font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-white/[0.07] text-white'
                  : 'text-sidebar-text hover:bg-white/[0.045] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2.5px] rounded-full bg-accent transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <item.icon
                  size={16}
                  strokeWidth={2}
                  className={`flex-shrink-0 transition-colors ${isActive ? 'text-accent-dim' : 'text-sidebar-text-dim group-hover:text-sidebar-text'}`}
                />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="relative py-2.5 px-2.5 border-t border-sidebar-border space-y-0.5">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-2.5 py-[7px] rounded-lg text-[13px] font-medium text-sidebar-text hover:bg-white/[0.045] hover:text-white transition-colors"
          >
            <item.icon size={16} className="flex-shrink-0 text-sidebar-text-dim" />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </button>
        ))}
        <div className="flex items-center gap-2.5 px-2.5 py-2 mt-1">
          <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-accent to-violet-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[11px] font-semibold">AP</span>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-sidebar" />
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-white truncate">Planner</p>
              <p className="text-[11px] text-sidebar-text-dim truncate flex items-center gap-1">
                <Sparkles size={9} /> Urban Designer
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
