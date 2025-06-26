import {Routes, Route} from 'react-router-dom';
import Farmers from './../shared/Farmers';
import AgricExperts from './../shared/AgricExperts';
import FarmManagers from '../shared/Managers';
import CreateFarm from './components/createFarm'
import Dashboard from "./Dashboard";
import ChatArea from './sections/ChatArea';
function OwnerRoutes(){
    return(
       <Routes>
        <Route path="/" element={<Dashboard/>}>
        {/*This Routes will be rendered inside the outlets*/}
        <Route path="chat" element={<ChatArea/>}/>
        <Route path="create-farm" element={<CreateFarm/>}/>
        
        {/*The Routes for the stakeholders*/}
          <Route path="farmers" element={<Farmers/>}/>
          <Route path="experts" element={<AgricExperts/>}/>
          <Route path='managers' element={<FarmManagers/>}/>
        
        </Route>
       </Routes>
    )
}
export default OwnerRoutes;