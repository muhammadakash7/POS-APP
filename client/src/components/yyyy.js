import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { token } from "morgan";
import { Alert } from "antd";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const CartPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmModal = () => {
    // Logic for handling the "Update" button click
    UpdateFunction();
    
    handleCloseModal(); // Close the custom modal
  };

  const handleCancelModal = () => {
    // Logic for handling the "Remove" button click
    RemoveFunction();
    handleCloseModal(); // Close the custom modal
  };

  const [productsToUpdate, setProductsToUpdate] = useState([]);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");

  const [loading, setLoading] = useState(false);
  const [productQuantity, setProductQuantity] = useState(null);

  const [able, setAble] = useState(false);
  //totla price

  const [totalCartPrice, setTotalCartPrice] = useState(0);

  // State for total price

  // Function to calculate total price based on cart contents
  const calculateTotalPrice = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const calculatedTotalPrice = calculateTotalPrice();
    setTotalCartPrice(calculatedTotalPrice);
  }, [cart]);

  //remove cartitem

  // const removeCartItem = (pid) => {
  //   try {
  //     const myCart = [...cart];
  //     let index = myCart.findIndex((item) => item._id === pid);
  //     myCart.splice(index, 1);
  //     setCart(myCart);
  //     localStorage.getItem("cart", JSON.stringify(myCart));
  //     toast.success("Cart deleted Successfully");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid); // Filter out the item to be removed
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage

      toast.success("Cart item deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // const increaseQuantity = (productId) => {
  //   const updatedCart = cart.map((item) => {
  //     if (item._id === productId) {
  //       if (item.quantity < 5) {
  //         return { ...item, quantity: item.quantity + 1 };
  //       } else {
  //         toast.success("Quantity reached the maximum limit");
  //       }
  //     }
  //     return item;
  //   });

  //   if (!updatedCart.some((item) => item._id === productId)) {
  //     updatedCart.push({ _id: productId, quantity: 1 });
  //   }

  //   setCart(updatedCart);
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  // };

  const increaseQuantity = async (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // try {
    //   const cartItem = cart.find((item) => item._id === productId);

    //   if (!cartItem) {
    //     // Product is not in the cart, add it with quantity 1
    //     const updatedCart = [...cart, { _id: productId, quantity: 1 }];
    //     setCart(updatedCart);
    //     localStorage.setItem("cart", JSON.stringify(updatedCart));
    //   } else {
    //     // Product is already in the cart
    //     const { data } = await axios.get(
    //       `http://localhost:8000/api/v1/product/quantity/${productId}`,
    //       {
    //         headers: {
    //           Authorization: JSON.parse(localStorage.getItem("auth")).token,
    //         },
    //       }
    //     );

    //     const apiQuantity = data.quantity;
    //     console.log("here is the api item qn::", cartItem.quantity);

    //     if (cartItem.quantity < apiQuantity) {
    //       // Increase the quantity if it's less than the API quantity
    //       const updatedCart = cart.map((item) => {
    //         if (item._id === productId) {
    //           return { ...item, quantity: item.quantity + 1 };
    //         }
    //         return item;
    //       });

    //       setCart(updatedCart);
    //       localStorage.setItem("cart", JSON.stringify(updatedCart));
    //     } else if (apiQuantity === 0) {
    //       alert("No Product Available");
    //     } else {
    //       // Show an alert if the stored quantity is greater than or equal to the API quantity
    //       alert(`Quantity reached the maximum limit for ${cartItem.name}`);
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // const increaseQuantity = async (productId) => {
  //   try {
  //     const cartItem = cart.find((item) => item._id === productId);

  //     if (!cartItem) {
  //       // Product is not in the cart, add it with quantity 1
  //       const updatedCart = [...cart, { _id: productId, quantity: 1 }];
  //       setCart(updatedCart);
  //       localStorage.setItem("cart", JSON.stringify(updatedCart));
  //     } else {
  //       // Product is already in the cart
  //       const { data } = await axios.get(
  //         `http://localhost:8000/api/v1/product/quantity/${productId}`,
  //         {
  //           headers: {
  //             Authorization: JSON.parse(localStorage.getItem("auth")).token,
  //           },
  //         }
  //       );

  //       const apiQuantity = data.quantity;

  //       if (cartItem.quantity < apiQuantity) {
  //         // Calculate the difference between the selected quantity and API quantity
  //         const difference = apiQuantity - cartItem.quantity;

  //         // Update the quantity in the backend immediately
  //         await axios.post(
  //           `http://localhost:8000/api/v1/product/update-quantity/${productId}`,
  //           {
  //             newQuantity: apiQuantity - difference,
  //           },
  //           {
  //             headers: {
  //               Authorization: JSON.parse(localStorage.getItem("auth")).token,
  //             },
  //           }
  //         );

  //         // Update the cart with the new quantity
  //         const updatedCart = cart.map((item) => {
  //           if (item._id === productId) {
  //             return { ...item, quantity: apiQuantity };
  //           }
  //           return item;
  //         });

  //         setCart(updatedCart);
  //         localStorage.setItem("cart", JSON.stringify(updatedCart));
  //       } else {
  //         // Show an alert if the stored quantity is greater than or equal to the API quantity
  //         alert(`Quantity reached the maximum limit for ${cartItem.name}`);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Function to decrease the quantity of a cart item
  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    // Load cart from local storage when component mounts
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  //get payment gatewy token

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const UpdateFunction = async () => {
    try {
      const updatedCart = [];
      for (const cartItem of cart) {
        const productId = cartItem._id;

        // Make an API call to get the current API quantity
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/product/quantity/${productId}`,
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("auth")).token,
            },
          }
        );

        const apiQuantity = data.quantity;

        const apiPrice = cartItem.price;
        console.log("API Pric: ", apiPrice);

        if (cartItem.quantity > apiQuantity) {
          // Update user's quantity to match the backend quantity
          updatedCart.push({
            _id: productId,
            quantity: apiQuantity,
            price: apiPrice,
          });
        } 
        else {
          updatedCart.push({
            _id: productId,
            quantity: cartItem.quantity,
            price: cartItem.price,
          });
        }
      }

      // Update the cart with the new quantities
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Swal.fire("Update!", "", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const RemoveFunction = () => {
    Swal.fire("Removed", "", "info");
  };

  const hanldePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();

      // Update quantities in the backend
      const updatedCart = []; // Create an array to store updated cart items
      const productsToUpdate = [];

      for (const cartItem of cart) {
        const productId = cartItem._id;
        const newQuantity = cartItem.quantity;

        // Make an API call to get the current API quantity
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/product/quantity/${productId}`,
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("auth")).token,
            },
          }
        );

        const apiQuantity = data.quantity;

        console.log("Product ID: ", productId);
        console.log("API Quantity: ", apiQuantity);
        console.log("Selected Quantity: ", newQuantity);

        if (newQuantity <= apiQuantity) {
          // If the selected quantity is less than or equal to the API quantity, proceed with payment
          updatedCart.push({ _id: productId, quantity: newQuantity });
        } else {
          // If the selected quantity is greater than the API quantity, add it to the productsToUpdate array
          productsToUpdate.push(cartItem);
        }
      }

      // Update quantities in the backend for all cart items
      for (const cartItem of updatedCart) {
        const productId = cartItem._id;
        const newQuantity = cartItem.quantity;

        // Make an API call to update the quantity for the specific product
        await axios.post(
          `http://localhost:8000/api/v1/product/update-quantity/${productId}`,
          {
            newQuantity: newQuantity,
          },
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("auth")).token,
            },
          }
        );
      }

      // If there are products to update, set them in the state and show the modal
      if (productsToUpdate.length > 0) {
        setProductsToUpdate(productsToUpdate);
        console.log("jgdhsgjgffuygefgjhfgueggfhgejgu",setProductsToUpdate)
        setShowModal(true);
      } else {
        // No products to update, continue with payment
        const { data } = await axios.post(
          "http://localhost:8000/api/v1/product/braintree/payment",
          {
            nonce,
            cart,
          },
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("auth")).token,
            },
          }
        );
        setLoading(false);
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/create-order");
        toast.success("Payment Completed Successfully");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getProductQuantity = async () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Iterate through the cart items and make API requests for each product
      for (const cartItem of cart) {
        const productId = cartItem._id;
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/product/quantity/${productId}`,
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("auth")).token,
            },
          }
        );

        const apiQuantity = data.quantity;

        // Get the existing quantity from local storage
        const storedQuantity = cartItem.quantity;

        console.log(`Product ID: ${productId}`);
        console.log("API Quantity: ", apiQuantity);
        console.log("Stored Quantity: ", storedQuantity);

        // Compare the quantities and update local storage if needed
        if (apiQuantity < storedQuantity) {
          // Calculate the difference
          const difference = storedQuantity - apiQuantity;

          // Update local storage by reducing the quantity of the specific product
          const updatedCart = cart.map((item) => {
            if (item._id === productId) {
              const newQuantity = item.quantity - difference;
              return { ...item, quantity: newQuantity };
            }
            return item;
          });

          // Update the local storage with the modified cart
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        if (storedQuantity > apiQuantity) {
          alert(`The quantity of ${cartItem.name} is no longer available.`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductQuantity();
  }, []);

  return (
    <Layout>
      <>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Do you want to Update or Remove?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Products with quantities greater than API quantities:</p>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {productsToUpdate.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelModal}>
              Remove
            </Button>
            <Button variant="primary" onClick={handleConfirmModal} >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `you have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Plz Login to Checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 card flex-row">
                <div className="col-md-4 ">
                  <img
                    style={{ height: "200px" }}
                    src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description}</p>
                  <p>Price $: {p.price}</p>
                  <p>Total Price $:{p.price * p.quantity}</p>

                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => decreaseQuantity(p._id)}
                      disabled={p.quantity <= 1}
                    >
                      -
                    </button>
                    <p>Quantity: {p.quantity}</p>
                    <button
                      className="btn btn-primary ml-2"
                      onClick={() => increaseQuantity(p._id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-danger mb-2 "
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | CheckOut | Payment</p>
            <hr />
            <h4>Total:{calculateTotalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/create-profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/create-profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={hanldePayment}
                    disabled={!instance || !auth?.user?.address}
                  >
                    {loading ? "processing" : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};