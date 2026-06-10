import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function Layout({ children }) {

 return (

 <div className="flex">

    <Sidebar />

    <div className="ml-[280px] w-full">

        <TopNavbar />

        <main className="p-6 bg-gray-50 min-h-screen">
          {children}
        </main>

    </div>

 </div>

 );
}