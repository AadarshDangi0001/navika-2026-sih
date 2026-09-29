import { useStore } from '../store/useStore'
import { PlanView } from '../components/workspace/PlanView'
import { ThreeDViewer } from '../components/workspace/ThreeDViewer'
import { WorkspaceToolbar } from '../components/workspace/WorkspaceToolbar'
import { LayerPanel } from '../components/workspace/LayerPanel'
import { BuildingInspector } from '../components/inspector/BuildingInspector'
import { SyncToast } from '../components/common/Toast'

export function Workspace() {
  const { viewMode, selectedBuilding } = useStore()

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <WorkspaceToolbar />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative">
          <LayerPanel />
          {viewMode === '2d' ? <PlanView /> : <ThreeDViewer />}
        </div>
        {selectedBuilding && <BuildingInspector />}
      </div>
      <SyncToast />
    </div>
  )
}
