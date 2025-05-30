import { Route, Routes } from "react-router-dom";
import Dashboard from './Dashboard';
import ChatArea from './sections/ChatArea'
import Farmers from "../shared/Farmers";
import FarmManagers from "../shared/Managers";


function ExpertRoutes(){
    return(
        <Routes>
        <Route path="/" element={<Dashboard/>}>
        <Route path="chat" element={<ChatArea/>}/>
        <Route/>
        <Route/>
        <Route/>
        <Route/>
         {/*The Routes for the other stakeholder*/}
        <Route path="farmers" element={<Farmers/>}/>
        <Route path="managers" element={<FarmManagers/>}/>
        <Route/> 
        </Route>
        </Routes>
    )
}
export default ExpertRoutes;