//import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
// import Dropdown from "../../components/dropdown/Dropdown";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <Navbar />
        {/* <div>
          <Dropdown/>
        </div> */}
        <div className="widgets">
          <Widget type="user" />
          <Widget type="Documents" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
