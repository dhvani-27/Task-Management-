import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/common/Sidebar";

export default function Dashboard() {
 return (
  <div style={{display: 'flex'}}>
   <Sidebar />

   <div style={{flex: 1}}>
    <Navbar />

    <div className="p-6">
     Dashboard Content Here
    </div>
   </div>
  </div>
 );
}