import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addImages,
  deleteOneCar,
  getByCarIdCars,
  getByCarsUserId,
  getImagesByCarId,
  updateOneCar,
} from "../service";
import { useDispatch, useSelector } from "react-redux";
import { Image, Card, Button, Modal, Space, Input } from "antd";
import Defaultcar from "../helper/defaultcar1.jpg";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IconButton, InputLabel } from "@mui/material";
import ImageGallery from "react-image-gallery";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;
function MyCar({ car }) {

  //modal add image start
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [url, setUrl] = useState();


  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(addImages({ url: url, carId: car.id }));
      navigate(0)
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

//  //modal add image finish




  //Edit modal start
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
  const [carName, setCarName] = useState(car?.carName);
  const [brand, setBrand] = useState(car?.brand);
  const [modal, setModal] = useState(car?.modal);
  const [year, setYear] = useState(car?.year);
  const [plate, setPlate] = useState(car?.plate);




  const showModalEdit = () => {
    setOpenEdit(true);
  };
  const handleOkEdit = () => {

    setModalText("The modal will be closed after two seconds");
    setConfirmLoadingEdit(true);
    setTimeout(() => {
      setOpenEdit(false);
      setConfirmLoadingEdit(false);
      dispatch(updateOneCar({carName:carName,brand:brand,year:year,plate:plate,modal:modal,id:car.id})
      )

    }, 2000);
  };
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };
//Edit modaFinish


//delete confirm
const showDeleteConfirm = () => {
  confirm({
    title: 'Uyarı',
    icon: <ExclamationCircleFilled />,
    content: 'Aracı silmek istediğinize emin misiniz ?',
    okText: 'Evet',
    okType: 'danger',
    cancelText: 'Hayır',
      onOk  ()  {
         dispatch(deleteOneCar(car.id))
         navigate(0)
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};



  const navigate = useNavigate();
  //navigate(0)
  const dispatch = useDispatch();

  const images = car
    ? car.carImages && car.carImages.map((url) => ({ original: url.url }))
    : [];
  return (
    <div>
      <main
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "100px",
          border: "6px solid white",
          borderRadius: "15px",
        }}
      >
        <section style={{ width: "500px" }}>
          {images.length > 0 ? (
            <ImageGallery items={images} />
          ) : (
            <img width={"500px"} src={Defaultcar} />
          )}
          <IconButton
            onClick={showModal}
            style={{ width: "100%", marginTop: "5px" }}
          >
            <MdOutlineAddAPhoto /> Resim Ekle
          </IconButton>
        </section>
        <section>
          <div>
            <IconButton onClick={showModalEdit}>
              <MdModeEditOutline />
            </IconButton>
            <IconButton onClick={showDeleteConfirm}>
              <MdDelete />
            </IconButton>
          </div>
          <Card  title={"Araç Bilgi Kartı"} style={{ width: "500px" }}>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              type="inner"
              title={car.carName}
            >
              <div style={{ display: "flex" }}>
                <h6>Marka: </h6> {car.brand}
              </div>
              <div style={{ display: "flex" }}>
                <h6>Model: </h6> {car.modal}
              </div>
              <div style={{ display: "flex" }}>
                <h6>Yıl: </h6> {car.year}
              </div>
              <div style={{ display: "flex" }}>
                <h6>Plaka: </h6> {car.plate}
              </div>
            </Card>
          </Card>
        </section>
      </main>
  
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
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Url giriniz..."
              name="url"
            />
          </Space>
        </Modal>
      </>




      <>
        <Modal
          title="Düzenle"
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
            <Input
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder="Araç adını giriniz..."
              name="carName"
            />
               <Input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Markayı giriniz..."
              name="brand"
            />
               <Input
              value={modal}
              onChange={(e) => setModal(e.target.value)}
              placeholder="Modeli giriniz..."
              name="modal"
            />
               <Input
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              placeholder="Plakayı giriniz..."
              name="plate"
            />
               <Input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Yılı giriniz..."
              name="year"
            />
          </Space>
        </Modal>
      </>
    </div>
  );
}

export default MyCar;
