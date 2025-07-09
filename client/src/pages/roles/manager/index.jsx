import {Routes, Route} from 'react-router-dom';
import Overview from './sections/Overview';
import Farmers from './../shared/Farmers';
import AgricExperts from './../shared/AgricExperts';
import ReportAnalytics from './components/ReportsAnalytics';
import FeildLocations from './components/FeildLocations';
import Dashboard from "./Dashboard";
import InventoryManagement from './components/Iventory';
import LaborManagement from './components/LaborManagement';
import FinancialRecord from './components/FinancialRecords';

import ChatArea from './sections/ChatArea';
function ManagerRoutes(){
    return(
       <Routes>
        <Route path="/" element={<Dashboard/>}>
        <Route index element={<Overview/>}/>
        {/*This Routes will be rendered inside the outlets*/}
        <Route path="chat" element={<ChatArea/>}/>
        <Route path="reports" element={<ReportAnalytics/>}/>
        <Route path="fields" element={<FeildLocations/>}/>
        <Route path="dashboard" element={<Overview/>}/>
        <Route path="inventory" element={<InventoryManagement/>}/>
        <Route path="labor" element={<LaborManagement/>}/>
        <Route path="finance" element={<FinancialRecord/>}/>
        
        {/*The Routes for the stakeholders*/}
          <Route path="farmers" element={<Farmers/>}/>
          <Route path="experts" element={<AgricExperts/>}/>
        
        </Route>
       </Routes>
    )
}
export default ManagerRoutes;