import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppLayout } from './layouts/AppLayout'
import { Overview } from './pages/Overview'
import { Projects } from './pages/Projects'
import { Workspace } from './pages/Workspace'
import { Analysis } from './pages/Analysis'
import { Proposals } from './pages/Proposals'
import { DigitalTwin } from './pages/DigitalTwin'
import { Reports } from './pages/Reports'
import { UrbanIntelligence } from './pages/UrbanIntelligence'

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: '#1a1a2e',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '13px',
            padding: '10px 16px',
          },
        }}
      />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/twin" element={<DigitalTwin />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/intelligence" element={<UrbanIntelligence />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
