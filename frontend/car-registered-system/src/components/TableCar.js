import React, { useEffect, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteOneCar, getAllCars } from "../service";
import { AiTwotoneEye } from "react-icons/ai";

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

function TableCar() {
  const columns = useMemo(() => {
    return [
      { id: "carName", label: "Araç Adı", minWidth: 170 },
      { id: "brand", label: "Marka", minWidth: 100 },
      {
        id: "modal",
        label: "Model",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "year",
        label: "Yıl",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "plate",
        label: "Plaka",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
      },
    ];
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const carsAll = useSelector((state) => state.cars.carsAll);
  const carsAllStatus = useSelector((state) => state.cars.carsAllStatus);


  useEffect(() => {
    if (carsAllStatus === "idle") {
      getCars();
    }
  }, [carsAllStatus, carsAll]);

  const getCars = async () => {
    await dispatch(getAllCars());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Paper  sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer  sx={{ maxHeight: 380 }}>
          <Table  stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody >
              {carsAll
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((car) => {
                  return (
                    <TableRow
                 
                      style={{ width: "500px" }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={car.id}
                    >
                     
                      {columns.map((column) => {
                        const value = car[column.id];
                        return (
                          <>
                            <TableCell  key={column.id} align={column.align}>
                           
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          </>
                        );
                      })}
                       <Link   to={`/cardetail/${car.id}`} style={{width:"15px",height:"15px"}}><IconButton style={{fontSize:"18px"}}><AiTwotoneEye/>İncele</IconButton></Link>
                      <div>
                        {localStorage.getItem("token") ? 
                        car.userId===parseInt(localStorage.getItem("currentUserId"))&&
                          <div>
                            <Link to={`/editCar/${car.id}`}>
                              <IconButton>
                                {" "}
                                <MdModeEditOutline />
                              </IconButton>
                            </Link>
                            <Link>
                              <IconButton
                                onClick={() =>  dispatch(deleteOneCar(car.id))}
                              >
                                {" "}
                                <MdDelete />
                              </IconButton>
                            </Link>
                          </div>
                        : 
                          ""
                        }
                      </div>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default TableCar;
