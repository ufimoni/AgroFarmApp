import {Routes, Route} from 'react-router-dom';
import Overview from './sections/Overview';
import Farmers from './../shared/Farmers';
import AgricExperts from './../shared/AgricExperts';
import Dashboard from "./Dashboard";
import ChatArea from './sections/ChatArea';
function ManagerRoutes(){
    return(
       <Routes>
        <Route path="/" element={<Dashboard/>}>
        {/*This Routes will be rendered inside the outlets*/}
        <Route path="chat" element={<ChatArea/>}/>
        
        
        {/*The Routes for the stakeholders*/}
          <Route path="farmers" element={<Farmers/>}/>
          <Route path="experts" element={<AgricExperts/>}/>
        
        </Route>
       </Routes>
    )
}
export default ManagerRoutes;