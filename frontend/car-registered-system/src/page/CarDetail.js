import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addImages, getAllCars, getByCarIdCars, getImagesByCarId } from "../service";
import { useDispatch, useSelector } from "react-redux";
import { Image, Card, Button, Modal, Space, Input } from "antd";
import Defaultcar from "../helper/defaultcar1.jpg";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IconButton, InputLabel } from "@mui/material";
import ImageGallery from "react-image-gallery";

function CarDetail() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const navigate = useNavigate();
  //navigate(0)

  const [url,setUrl]=useState();
  const { carId } = useParams();
  const dispatch = useDispatch();
  const carsByCarId = useSelector((state) => state.cars.carsByCarId);
  const imagesCarId = useSelector((state) => state.images.imageCarId);
  const imageCarIdStatus = useSelector(
    (state) => state.images.imageCarIdStatus
  );

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
       dispatch(addImages({url:url,carId:carId}))
      setOpen(false);
      setConfirmLoading(false);
      
    }, 2000);

  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    getOneCar();
    if(imageCarIdStatus==="idle"){
      get();
    }
   
  }, [carId,imageCarIdStatus,imagesCarId]);

  const getOneCar = async () => {
    await dispatch(getByCarIdCars(carId));
  };

  const get = async () => {
    await dispatch(getImagesByCarId(carId));
  };
  const images=imagesCarId.length>0?imagesCarId[0].map((url)=>({original:url.url})):[]
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <section style={{ width: "500px" }}>
      {
        images.length>0?<ImageGallery items={images} />:<img width={"500px"} src={Defaultcar}/>
      }
      
      {
        parseInt(localStorage.getItem("currentUserId"))===carsByCarId?.userId?   <IconButton
        onClick={showModal}
        style={{ width: "100%", marginTop: "5px" }}
      >
        <MdOutlineAddAPhoto /> Resim Ekle
      </IconButton>:""
      }
     
      </section>
      <section>
        <Card title={"Araç Bilgi Kartı"} style={{ width: "500px" }}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            type="inner"
            title={carsByCarId ? carsByCarId.carName : ""}
          >
            <div style={{ display: "flex" }}>
              <h6>Marka: </h6> {carsByCarId ? carsByCarId.brand : ""}
            </div>
            <div style={{ display: "flex" }}>
              <h6>Model: </h6> {carsByCarId ? carsByCarId.modal : ""}
            </div>
            <div style={{ display: "flex" }}>
              <h6>Yıl: </h6> {carsByCarId ? carsByCarId.year : ""}
            </div>
            <div style={{ display: "flex" }}>
              <h6>Plaka: </h6> {carsByCarId ? carsByCarId.plate : ""}
            </div>
          </Card>
        </Card>
      </section>

      <>
        <Modal
          title="Resim Ekle"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Space
            style={{
              width: "100%",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            direction="vertical"
          >
            <Input 
            value={url}
            onChange={(e)=>setUrl(e.target.value)}
            placeholder="Url giriniz..." name="url" 
            />
          </Space>
        </Modal>
      </>
    </main>
  );
}

export default CarDetail;
