import { Save, Share2, Download, Maximize, RotateCcw, Map, Box } from 'lucide-react'
import { useStore } from '../../store/useStore'
import toast from 'react-hot-toast'

export function WorkspaceToolbar() {
  const { viewMode, setViewMode } = useStore()

  return (
    <div className="h-12 flex items-center justify-between px-4 bg-surface-raised border-b border-border">
      <div className="leading-tight">
        <p className="text-[13px] font-semibold text-text-primary tracking-tight">Bhopal Sustainable District</p>
        <p className="text-[10.5px] text-text-muted">Site Workspace</p>
      </div>

      <div className="flex items-center bg-surface rounded-lg p-0.5 border border-border">
        <button
          onClick={() => setViewMode('2d')}
          className={`flex items-center gap-1.5 px-3.5 py-[5px] rounded-md text-[12px] font-medium transition-all ${
            viewMode === '2d' ? 'bg-text-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Map size={12} />
          PLAN
        </button>
        <button
          onClick={() => setViewMode('3d')}
          className={`flex items-center gap-1.5 px-3.5 py-[5px] rounded-md text-[12px] font-medium transition-all ${
            viewMode === '3d' ? 'bg-text-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Box size={12} />
          3D
        </button>
      </div>

      <div className="flex items-center gap-0.5">
        <button
          onClick={() => toast.success('Project saved', { style: { fontSize: '13px' } })}
          className="p-2 rounded-lg hover:bg-surface-hover text-text-secondary transition-colors"
          title="Save"
        >
          <Save size={14} />
        </button>
        <button className="p-2 rounded-lg hover:bg-surface-hover text-text-secondary transition-colors" title="Share">
          <Share2 size={14} />
        </button>
        <button className="p-2 rounded-lg hover:bg-surface-hover text-text-secondary transition-colors" title="Export">
          <Download size={14} />
        </button>
        <button className="p-2 rounded-lg hover:bg-surface-hover text-text-secondary transition-colors" title="Reset">
          <RotateCcw size={14} />
        </button>
        <div className="w-px h-4 bg-border mx-1" />
        <button
          onClick={() => document.documentElement.requestFullscreen?.()}
          className="p-2 rounded-lg hover:bg-surface-hover text-text-secondary transition-colors"
          title="Fullscreen"
        >
          <Maximize size={14} />
        </button>
      </div>
    </div>
  )
}
