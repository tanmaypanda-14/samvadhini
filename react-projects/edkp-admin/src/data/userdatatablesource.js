export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "erp",
      headerName: "ERP",
      width: 150,
    },
  
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];
  
  //temporary data
  export const userRows = [
    {
        id: 1,
        username: "test1",
        img: "",
        status: "recieved",
        erp: "1234567890",
        age: 35,
    },
    {
        id: 2,
        username: "test1",
        img: "",
        status: "pending",
        erp: "1234567890",
        age: 35,
    },
    {
        id: 3,
        username: "test1",
        img: "",
        status: "recieved",
        erp: "1234567890",
        age: 35,
    },
    {
        id: 4,
        username: "test1",
        img: "",
        status: "recieved",
        erp: "1234567890",
        age: 35,
    },
    {
        id: 5,
        username: "test1",
        img: "",
        status: "pending",
        erp: "1234567890",
        age: 35,
    },
    {
        id: 6,
        username: "test1",
        img: "",
        status: "failed",
        erp: "1234567890",
        age: 35,
    },
    {
        id: 7,
        username: "test1",
        img: "",
        status: "recieved",
        erp: "1234567890",
        age: 35,
    },
    {
        id: 8,
        username: "test1",
        img: "",
        status: "recieved",
        erp: "1234567890",
        age: 35,
    },
    {
        id: 9,
        username: "test1",
        img: "",
        status: "failed",
        erp: "1234567890",
        age: 35,
    },
    {
        id: 10,
        username: "test1",
        img: "",
        status: "recieved",
        erp: "1234567890",
        age: 35,
    },
  ];