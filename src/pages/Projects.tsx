import { Plus } from 'lucide-react'
import { ProjectCard } from '../components/common/ProjectCard'
import { PageHeader } from '../components/common/PageHeader'
import { projects } from '../data/projects'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export function Projects() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto p-6">
        <PageHeader
          title="Projects"
          subtitle={`${projects.length} active projects across your portfolio`}
          actions={
            <button
              onClick={() => toast.success('Project creation coming soon', { style: { fontSize: '13px' } })}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent text-white text-[13px] font-medium hover:bg-accent-dim transition-colors shadow-sm"
            >
              <Plus size={15} />
              New Project
            </button>
          }
        />

        <div className="grid grid-cols-3 gap-5 mt-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => navigate('/workspace')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
