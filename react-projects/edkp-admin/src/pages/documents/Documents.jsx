import "./documents.scss"
import Navbar from "../../components/navbar/Navbar"
import Docdatatable from "../../components/datatable/Docdatatable"

const List = () => {
  return (
    <div className="documents">
      <div className="documentsContainer">
        <Navbar/>
        <Docdatatable/>
      </div>
    </div>
  )
}

export default List