import { Eye, EyeOff, Layers } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function LayerPanel() {
  const { layers, toggleLayer } = useStore()

  return (
    <div className="absolute top-3 left-3 z-10 bg-surface-raised/95 backdrop-blur-md rounded-xl border border-border shadow-[var(--shadow-panel)] w-48 overflow-hidden">
      <div className="px-3 py-2.5 border-b border-border-subtle flex items-center gap-1.5">
        <Layers size={11} className="text-text-muted" />
        <h4 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Layers</h4>
      </div>
      <div className="p-1.5">
        {layers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => toggleLayer(layer.id)}
            className="w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[12px] hover:bg-surface-hover transition-colors"
          >
            <div className="w-2.5 h-2.5 rounded-[3px] transition-opacity" style={{ backgroundColor: layer.color, opacity: layer.visible ? 1 : 0.25 }} />
            <span className={layer.visible ? 'text-text-primary font-medium' : 'text-text-muted'}>{layer.name}</span>
            <span className="ml-auto">
              {layer.visible ? <Eye size={12} className="text-text-muted" /> : <EyeOff size={12} className="text-text-muted/40" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
