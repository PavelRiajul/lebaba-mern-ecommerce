import { Link, NavLink } from "react-router"


const Navbar = () => {
  return (
    <header className="fixed-nav-bar w-nav">
    <nav
      className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
      <ul className="nav__links">
        <li className="link"><NavLink  className={({ isActive }) =>
          isActive ? "active" : ""} to="/">Home</NavLink></li>
        <li className="link"><NavLink className={({ isActive }) =>
          isActive ? "active" : ""}  to="/shop">Shop</NavLink></li>
        <li className="link"><NavLink className={({ isActive }) =>
          isActive ? "active" : ""}  to="/pages">Pages</NavLink></li>
        <li className="link"><NavLink className={({ isActive }) =>
          isActive ? "active" : ""}  to="/contact">Contact</NavLink></li>
      </ul>
      <div className="nav__logo">
        <Link to="/">Lebaba<span>.</span></Link>
      </div>
      <div className="nav__icons relative">
        <span><Link to="/search"><i className="ri-search-line"></i></Link></span>
        <span><button className="hover:text-[#ed3849]">
            <i className="ri-shopping-bag-line"></i><sup
              className="text-sm inline-block w-4 px-1.5 text-white rounded-full bg-[#ed3849] text-center">0</sup>
          </button>
          <Link to={'/login'}> <i className="ri-user-line  rounded-full cursor-pointer"></i>
          </Link>
          </span>
      </div>
    </nav>
  </header>
  )
}

export default Navbar