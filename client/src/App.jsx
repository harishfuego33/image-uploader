import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("Mountain-honey");
  const [cost, setCost] = useState(399);
  const [quantity, setQuantity] = useState(10);
  const [description, setDescription] = useState(
    "Honey is a sweet fluid made by honeybees using the nectar of flowering plants. There are about 320 different varieties of honey, which vary in color, odor and flavor. Honey contains mostly sugar, as well as a mix of amino acids, vitamins, minerals, iron, zinc and antioxidants."
  );
  const [file, setFile] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new formData();
    formData.append("title", title);
    formData.append("cost", cost);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("image", file);
    try {
      await axios.post("localhost:3000/api/posts", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const setSelectedFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
  };

  return (
    <form className="import-box" onSubmit={handleSubmit}>
      <h3 className="import_heading">UPLOAD PRODUCE</h3>
      <div className="input_box">
        <input
          placeholder="Enter the product title"
          type="text"
          name="produce_title"
          value={title}
          className="form__title-input"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="input_box">
        <input
          placeholder="Enter the product cost"
          type="text"
          name="produce_cost"
          value={cost}
          className="form__title-input"
          onChange={(e) => setCost(e.target.value)}
          required
        />
      </div>
      <div className="input_box">
        <input
          placeholder="Enter the product quantity"
          type="text"
          name="produce_cost"
          value={quantity}
          className="form__title-input"
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <div className="input_box">
        <textarea
          placeholder="Enter the product description"
          type="text"
          name="produce_title"
          value={description}
          className="form__title-input text-area"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <input
        type="file"
        id="form__image-input"
        className="file__input"
        multiple={true}
        onChange={setSelectedFile}
        accept="image/*"
      />
      <button type="button" className="form_btn">
        submit
      </button>
    </form>
  );
}

export default App;
