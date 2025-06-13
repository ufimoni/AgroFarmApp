// This File is to Route the Farm components
import { Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard';
import Overview from './sections/Overview' /// for only overview
import Task from './sections/Tasks'
import CropsManagement from './components/CropsManagement';
import EquipmentStats from './components/EquipementStats';
import Irrigation from './components/Irrigation';
import Pest_Disease from './components/Pest_Alerts';
import Weather from './components/Weather';
import FarmManagers from './../shared/Managers';
import AgricExperts from './../shared/AgricExperts';
import Settings from './components/Settings';
import Notifications from './components/notifications';
import FarmerProfile from './components/profile';

import ChatArea from './sections/ChatArea'

function FarmerRoutes(){
    return(
    <Routes>
  <Route path="/" element={<Dashboard />}>
    <Route index element={<Overview />} />
    <Route path="tasks" element={<Task />} />
    <Route path="chat" element={<ChatArea />} />
    <Route path="equipment" element={<EquipmentStats />} />
    <Route path="irrigation" element={<Irrigation />} />
    <Route path="alerts" element={<Pest_Disease />} />
    <Route path="crops" element={<CropsManagement />} />
    <Route path="weather" element={<Weather />} />
    <Route path="settings" element={<Settings />} />
    <Route path="notifications" element={<Notifications/>} />
    <Route path="farmerProfile" element={<FarmerProfile />} />
  


{/* The Other Routes*/}
    <Route path="managers" element={<FarmManagers />} />
    <Route path="experts" element={<AgricExperts />} />
  </Route>
</Routes>

    )
}
export default FarmerRoutes; /// but this is a Route so here we will render all the components