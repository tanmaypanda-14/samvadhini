import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { docColumns, docRows } from "../../data/docdatatablesource";
import { useState } from "react";
import { Link } from "react-router-dom";

const Docdatatable = () => {
  const [data] = useState(docRows);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Documents
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={docColumns.concat(actionColumn)}
        // columns={docColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Docdatatable;
