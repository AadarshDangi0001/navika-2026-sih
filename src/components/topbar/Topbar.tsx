import { Search, Bell, Share2, Download, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function Topbar() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="h-14 flex items-center justify-between px-5 bg-surface-raised border-b border-border">
      <button className="flex items-center gap-2 px-2 py-1 -ml-2 rounded-lg hover:bg-surface-hover transition-colors group">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/10 flex items-center justify-center flex-shrink-0">
          <div className="w-2 h-2 rounded-sm bg-accent" />
        </div>
        <div className="text-left leading-tight">
          <p className="text-[10px] text-text-muted -mb-0.5">Project</p>
          <p className="text-[13px] font-semibold text-text-primary">Bhopal Sustainable District</p>
        </div>
        <ChevronDown size={13} className="text-text-muted group-hover:text-text-secondary transition-colors ml-0.5" />
      </button>

      <div className="flex items-center gap-1.5">
        <div className="relative">
          <input
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
            placeholder="Search buildings, areas..."
            className={`text-[13px] pl-8 pr-3 py-[7px] rounded-lg border bg-surface outline-none transition-all duration-200 placeholder:text-text-muted ${
              searchOpen ? 'w-64 border-accent/40 ring-4 ring-accent/[0.08]' : 'w-44 border-border'
            }`}
          />
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        </div>

        <div className="w-px h-5 bg-border mx-1" />

        <button className="p-2 rounded-lg hover:bg-surface-hover text-text-secondary transition-colors relative">
          <Bell size={15} />
          <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] bg-accent rounded-full ring-2 ring-surface-raised" />
        </button>
        <button className="p-2 rounded-lg hover:bg-surface-hover text-text-secondary transition-colors">
          <Share2 size={15} />
        </button>
        <button className="flex items-center gap-1.5 pl-3 pr-3.5 py-[7px] rounded-lg text-[12.5px] font-medium bg-text-primary text-white hover:bg-black transition-colors shadow-sm">
          <Download size={13} />
          Export
        </button>
      </div>
    </header>
  )
}
