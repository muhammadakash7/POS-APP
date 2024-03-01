import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { addtoDelete} from "../redux/cartSlice";
const CardPage = () => {
  const {cart} = useSelector(state => state.cart);
  console.log("Cart Items:", cart);
  const dispatch = useDispatch();
  // const handleDeleteClick = (itemId) => {
  //   console.log('Deleting item with ID:', itemId);
  //   dispatch(addtoDelete({ itemId }));
  // };
  
  return (
    <DefaultLayout>
      <h1>Cart Page</h1>
      <button className='btn btn-success my-3'>Create +</button>
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
          {cart.map(item => (
            <tr key={item._id}>
              <td>{item.item.name}</td>
              <td>
                <img src={item.item.image} alt={item.name} height="60" width="60" />
              </td>
              <td>{item.item.price}</td>
              <td>{item.item.category}</td>
              <td>
                <button className='btn btn-sm btn-danger my-2'            
                 onClick={() => dispatch(addtoDelete({item}))}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DefaultLayout>
  );
};

export default CardPage;

