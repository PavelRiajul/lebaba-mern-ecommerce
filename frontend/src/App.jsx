import { Outlet } from "react-router"
import Navbar from "../src/components/Navbar/Navbar"
import Footer from "./components/Footer"

const App = () => {
  return (
    <>
     <Navbar/>
     <main className="min-h-screen">
     <Outlet/>
     </main>
      <Footer/>
    </>
  )
}
export default App