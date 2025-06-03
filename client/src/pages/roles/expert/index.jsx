import { Route, Routes } from "react-router-dom";
import Dashboard from './Dashboard';
import ChatArea from './sections/ChatArea'
import Farmers from "../shared/Farmers";
import FarmManagers from "../shared/Managers";
import DataAnalysis from "./components/Data_Analysis";
import FeildVisits from "./components/Feild_Visits";
import Research from "./components/Research";
import KnowledgeBase from "./components/Knowledge";
function ExpertRoutes(){
    return(
        <Routes>
        <Route path="/" element={<Dashboard/>}>
        <Route path="chat" element={<ChatArea/>}/>
        <Route path="analytics" element={<DataAnalysis/>}/>
        <Route path="visits" element={<FeildVisits/>}/>
        <Route path="knowledge" element={<KnowledgeBase/>}/>
        <Route path="research" element={<Research/>}/>
         {/*The Routes for the other stakeholder*/}
        <Route path="farmers" element={<Farmers/>}/>
        <Route path="managers" element={<FarmManagers/>}/>
        <Route/> 
        </Route>
        </Routes>
    )
}
export default ExpertRoutes;