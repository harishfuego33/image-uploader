import { Routes, Route, BrowserRouter } from "react-router-dom";
import Products from "./pages/products-list";
import ProductUpload from "./pages/product-upload";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductUpload />} />
          <Route path="/product" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
