import { Outlet } from "react-router"
import Navbar from "../src/components/Navbar/Navbar"

const App = () => {
  return (
    <>
     <Navbar/>
      <Outlet/>
    </>
  )
}
export default App