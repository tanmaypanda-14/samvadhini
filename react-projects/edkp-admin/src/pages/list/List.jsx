import "./list.scss"
import Navbar from "../../components/navbar/Navbar"
import Userdatatable from "../../components/datatable/Userdatatable"

const List = () => {
  return (
    <div className="list">
      <div className="listContainer">
        <Navbar/>
        <Userdatatable/>
      </div>
    </div>
  )
}

export default List