import "./navbar.scss";
//import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
//import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Collegelogo from "../../assets/MIT-WPU.png"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
      <div className="logo">
      <img src={Collegelogo} width={60} height={60}  alt="MIT-WPU LOGO"></img>
      <span className="logoName">MIT WORLD PEACE UNIVERSITY | PUNE</span>

      </div>
      
        <div className="search">
          <input type="text" placeholder="Enter ERP number" />
         
        </div>
       

        
          <div className="item">
            Logout
          </div>
        </div>
      </div>
  
  );
};

export default Navbar;