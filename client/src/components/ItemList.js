import React from "react";
import { Card, Button } from "antd";
import { useDispatch } from "react-redux";
import { addtoCart } from "../redux/cartSlice";

const { Meta } = Card;
const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  return (  
    <div>
      <Card
        key={item._id}
        // hoverable
        style={{ width: 240, marginBottom: 10 }}
        cover={<img alt="Error" src={item.image} style={{ height: 250 }} />}
      >
        <Meta title={item.name} />
        <div className="item-button">
          <Button
            onClick={() => 
              dispatch(addtoCart({item}))
            }
          >
            Add To Card
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;
