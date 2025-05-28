// This File is to Route the Farm components
import { Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard';
import Overview from './sections/Overview' /// for only overview
import Task from './sections/Tasks'
import FarmManagers from './../shared/Managers';
import AgroExperts from './../shared/AgricExperts';
import ChatArea from './sections/ChatArea'
function FarmerRoutes(){
    return(
         <Routes>
      <Route path="/" element={<Dashboard />}>
        {/* These routes will render inside <Outlet /> of Dashboard */}
        <Route index element={<Overview />} />
        <Route path="tasks" element={<Task/>} />
        <Route path="chat" element={<ChatArea />} />

        {/*The Routes for the other stakeholder*/}
        <Route path="managers" element={<FarmManagers/>}/>
         <Route path="experts" element={<AgroExperts/>}/>
        <Route/>
      </Route>
    </Routes>
    )
}
export default FarmerRoutes; /// but this is a Route so here we will render all the components