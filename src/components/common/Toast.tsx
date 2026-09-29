import { CheckCircle } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function SyncToast() {
  const syncToast = useStore((s) => s.syncToast)

  if (!syncToast) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 bg-text-primary text-white rounded-xl shadow-[var(--shadow-panel)] text-[13px] font-medium animate-fade-in-up">
      <CheckCircle size={15} className="text-emerald-400" />
      Views synchronized
    </div>
  )
}
