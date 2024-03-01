import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
// import { addtoDelete} from "../redux/cartSlice";
import axios from "axios";
import { Modal,Form,Button,Select,Input, message } from 'antd';

const ItemPage = () => {
  const [itemsData,setItemData]=useState([])
  const [popmodal,setPopmodal]= useState(false)
  const [editItem,setEditItem]= useState(null)
  const getAllItems = async ()=>{
    try {
      const {data}= await axios.get('http://localhost:8080/api/items/get-item')
      setItemData(data);
      console.log("iiiitemData",data);
    } catch (error) {
      console.log(error);
    }
  }; 

    // useEffect
    useEffect(()=>{
      getAllItems();
    },[])
    // handle form submit
    const handleSubmit =async (value)=>{
      if(editItem === null){
        try {
          await axios.post("http://localhost:8080/api/items/add-item",value)
        message.success("Item Updated Seccessfuly")
        setPopmodal(false);
        //  getAllItems method is used for show all changing without refresh page
        getAllItems();
      } catch (error) {
        message.error("Something Went Wrong");
        console.log("Error",error);
      }
      }else{
        try {
          await axios.put("http://localhost:8080/api/items/edit-item",{...value,itemId:editItem})
        message.success("Item Updated Seccessfuly")
        setPopmodal(false);
        getAllItems();
      } catch (error) {
        message.error("Something Went Wrong");
        console.log("Error",error);
      }
      }
    }
    // handle Delete 
    const handleDelete = async (item)=>{
      try {
        await axios.post("http://localhost:8080/api/items/delete-item",{itemId:item._id})
      message.success("Item Deleted Seccessfuly")
      setPopmodal(false);
      getAllItems();
    } catch (error) {
      message.error("Something Went Wrong");
      console.log("Error",error);
    }
    }
  
  return (
    <DefaultLayout>
      <h1>Item List</h1>
      <button className='btn btn-success my-3' onClick={()=> setPopmodal(true)}>Add Item</button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemsData.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>
                <img src={item.image} alt={item.name} height="60" width="60" />
              </td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>
                <button className='btn btn-sm btn-primary mx-1 my-2' onClick={()=>{setEditItem(item); setPopmodal(true);}}>Edit</button>
                <button className='btn btn-sm btn-danger my-2' onClick={()=>{handleDelete(item)}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {popmodal && (
      <Modal title={`${editItem !== null ? "Edit Item":"Add New Item"}`} open={popmodal}  onCancel={()=> {setEditItem(null); setPopmodal(false)}} footer={(false)}>
        <Form layout="vertical" initialValues={editItem} onFinish={handleSubmit}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select>
              <Select.Option value="Drink"></Select.Option>
              <Select.Option value="Rice"></Select.Option>
              <Select.Option value="Noodle"></Select.Option>
            </Select>
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">Save</Button>
          </div>
        </Form>
      </Modal>
      )}

    </DefaultLayout>
  );
};

export default ItemPage;