import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { docColumns, docRows } from "../../data/docdatatablesource";
import { useState } from "react";

const Docdatatable = () => {
  const [data] = useState(docRows);

  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 100,
  //   },
  // ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Documents
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        // columns={userColumns.concat(actionColumn)}
        columns={docColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Docdatatable;
