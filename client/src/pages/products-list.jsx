import { useEffect, useState } from "react";
import Product from "../comps/product";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="products">
      {products.length &&
        products.map((ele, i) => (
          <Product
            key={i}
            title={ele.title}
            cost={ele.cost}
            description={ele.description}
            imageUrl={ele.imageUrl}
          />
        ))}
    </div>
  );
};

export default Products;
