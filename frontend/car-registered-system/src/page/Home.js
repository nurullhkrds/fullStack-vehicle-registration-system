import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  IconButton,
 
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { MdFilterAlt } from "react-icons/md";
import TableCar from "../components/TableCar";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { BsFillCarFrontFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { filteredData } from "../redux/carsSlice";
import { Modal, Space } from "antd";
import { getAllByBrand, getAllByModal, getAllByModalAndByBrand, getAllCars } from "../service";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const brand = [
  "BMW",
  "Mercedes",
  "Honda",
  "Audi",
  "Toyota",
  "Volswagen",
  "Volvo",
];
const modelBrand = [
  [
    "525 X drive Sedan",
    "320 X drive Sedan",
    "X5 jeep",
    "116i hatchback",
    "M8 Coupe",
  ],

  ["S600", "E600", "maybach 4 Matic", "CLA AMG A100", "GLA jeep"],

  ["honda civic", "honda accord", "honda City", "honda HR-V", "honda CR-V"],

  [
    "Audi A1 Sportback",
    "Audi Q5",
    "Audi A7 Sportback",
    "Audi A4 Allroad",
    "Audi TTC ",
  ],

  ["Corolla", "C-HR", "RAV4", "Auris", "Yaris"],

  ["Polo", "Golf", "T-Roc", "Tiguan", "Caddy", "Transporter"],

  ["S60", "S40", "XC60", "S90", "XC90"],
];

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const [brandFiltered, setBrandFiltered] = React.useState("");
  const [modalFiltered, setModalFiltered] = React.useState("");

  const [openEdit, setOpenEdit] = React.useState(false);
  const [confirmLoadingEdit, setConfirmLoadingEdit] = React.useState(false);


  const handleSubmit =async()=>{
    if(search!==" "){
      await dispatch(filteredData(search));

    }

  }

  
  const fetchData=()=>{
    if(brandFiltered==!""&&modalFiltered!==""){
      dispatch(getAllByModalAndByBrand({brand:brandFiltered,modal:modalFiltered}))
    }else if(brandFiltered!==""){
      dispatch(getAllByBrand(brandFiltered))

    }else if(modalFiltered!==""){
      dispatch(getAllByModal(modalFiltered))
    }
  

  }

  const showModalEdit = () => {
    setOpenEdit(true);
  };
  const handleOkEdit = () => {
    setConfirmLoadingEdit(true);
    setTimeout(() => {
      fetchData()
      setOpenEdit(false);
      setConfirmLoadingEdit(false);
    }, 2000);
  };
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };
  const handleAll=async()=>{
    await dispatch(getAllCars())
    setBrandFiltered("")
    setModalFiltered("")

  }

  

  const logout = () => {
    localStorage.clear("token");
    localStorage.clear("currentUserId");
    localStorage.clear("currentUserName");
    navigate(0);
  };


  
  return (
    <div>
    <main>
      <section style={{ marginLeft: "80px", marginTop: "15px" }}>
        <h2>Araçlar</h2>
      </section>
      <section style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ marginLeft: "15px", marginTop: "20px" }}> </div>
        <div style={{ display: "flex" }}>
          {localStorage.getItem("token") ? (
            <IconButton onClick={() => logout()}>
              <HiOutlineLogout />
            </IconButton>
          ) : (
            ""
          )}
          <div style={{ background: "white", borderRadius: "15px" }}>
            <Search onSubmit={handleSubmit()}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Arama yap..."
                inputProps={{ "aria-label": "search" }}
                value={search}
              />
            </Search>
          </div>
        </div>
      </section>
      <hr></hr>
      <div
        style={{
          display: "flex",
          width: "1100px",
          justifyContent: "space-between",
        }}
      >
        <div>
        <section style={{marginLeft:"20px"}}>
           <IconButton onClick={showModalEdit}><MdFilterAlt/></IconButton>
           <Button onClick={handleAll}>Tümü</Button>
         </section>
       
        {localStorage.getItem("token") ? (
          <div>
         
          <section
            style={{ marginLeft: "25px", marginRight: "25px", width: "100px" }}
          >
            <Link to={"/addNewCar"} style={{ textDecoration: "none" }}>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "150px",
                  border: "1px solid",
                }}
              >
                <AiOutlinePlus style={{ width: "25px", height: "25px" }} /> Araç
                Ekle
              </Button>
            </Link>
          </section>
          </div>
        ) : (
          ""
        )}

        </div>
    

        {localStorage.getItem("token") ? (
          <section
            style={{ marginLeft: "25px", marginRight: "25px", width: "100px" }}
          >
            <Link to={"/mycar"} style={{ textDecoration: "none" }}>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "150px",
                  border: "1px solid",
                  fontSize: "12px",
                }}
              >
                <BsFillCarFrontFill style={{ width: "25px", height: "25px" }} />
                Benim Arabam
              </Button>
            </Link>
          </section>
        ) : (
          ""
        )}
      </div>

      <section
        style={{ marginTop: "10PX", marginLeft: "25px", marginRight: "25px" }}
      >
        <TableCar />
      </section>
     

    
    </main>
        <>
        <Modal
          title="Filtrele"
          open={openEdit}
          onOk={handleOkEdit}
          confirmLoading={confirmLoadingEdit}
          onCancel={handleCancelEdit}
        >
          <Space
            style={{
              width: "100%",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            direction="vertical"
          >
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
             
                <div>
                  <InputLabel>
                    <strong>Marka</strong>
                  </InputLabel>
                  <Select
                    placeholder="Markayı giriniz..."
                    style={{
                      width: "200px",
                    }}
                    name="brand"
                    onChange={(e) => setBrandFiltered(e.target.value)}
                    value={brandFiltered}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {brand.map((brand, key) => {
                      return <MenuItem value={brand}>{brand}</MenuItem>;
                    })}
                  </Select>
                </div>

                <div>
                  <InputLabel>
                    <strong>Modal</strong>
                  </InputLabel>
                  <Select
                    placeholder="Modeli giriniz..."
                    style={{
                      width: "200px",
                    }}
                    name="model"
                    onChange={(e) => setModalFiltered(e.target.value)}
                    value={modalFiltered}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {brandFiltered
                      ? modelBrand[
                          brand.findIndex((brand) => brand === brandFiltered)
                        ].map((model,key) => {
                          return <MenuItem key={key} value={model}>{model}</MenuItem>;
                        })
                      : modelBrand.map((model) => {
                          return model.map((m,key) => {
                            return <MenuItem key={key} value={m}>{m}</MenuItem>;
                          });
                        })}
                  </Select>
                </div>
            
            </section>
          </Space>
        </Modal>
      </>
      </div>
  );
}
