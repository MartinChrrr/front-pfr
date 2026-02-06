import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/ui/Button'
import Modal from './components/ui/Modal'
import SidebarItem from './components/ui/SidebarItem'
import type { LucideIcon } from "lucide-react";
import { Home } from "lucide-react";
import SidebarItemGroup from './components/ui/SidebarItemGroup'

function App() {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1 className="text-3xl font-bold text-white bg-primary-700">Welcome to My App</h1>
      <br/>
      <br/>
      <br/>
      <SidebarItem
        to='/dashboard' 
        label="Dashboard" 
        icon={Home} 
      />
      <SidebarItemGroup 
        label="Group 1"
        icon={Home} 
        subItems={[
          {
            label: "Overview",
            onClick: () => console.log("Overview"),
          },
          {
            label: "Analytics",
            onClick: () => console.log("Analytics"),
          },
      ]}
      />
      {/* <Modal
        title="Supprimer l’élément"
        isOpen={open}
        onClose={() => setOpen(false)}
      >  
          <div>Bonjour</div>
          <div>Bonjour</div>

      </Modal>
      <div className='m-10'>
        <Button onClick={() => setOpen(true)}>Ouvrir le modal</Button>
        <br/>
        <br/>
       

      </div> */}
    </>
  )
}

export default App
