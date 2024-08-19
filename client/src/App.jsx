import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState("");
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState([]);
  const [message, setMessage] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("cost", cost);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("image", file);
    // file.map((img) => formData.append("image", img));
    try {
      const response = await axios.post(
        "http://localhost:3000/api/posts",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setMessage(response);
    } catch (err) {
      console.log(err);
    }
  };
  const setSelectedFile = (e) => {
    const selectedFile = Array.from(e.target.files);
    const newUrl = selectedFile.map((ele) => URL.createObjectURL(ele));
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setPreview(newUrl);
  };
  const removeItem = (index) => {
    const updatedPreview = preview.filter((_, i) => i !== index);
    const updatedFile = file.filter((_, i) => i !== index);
    URL.revokeObjectURL(preview[index]);
    setPreview(updatedPreview);
    setFile(updatedFile);
  };
  if (message !== undefined) console.log(message);

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
      <div>
        <input
          type="file"
          id="form__image-input"
          className="file__input hidden"
          // multiple={true}
          onChange={setSelectedFile}
          accept="image/*"
        />
        <label
          htmlFor="form__image-input"
          id="file__upload-btn"
          className="file__upload-btn"
        >
          choose a file
        </label>
        <div className="preview-container">
          {preview.map((img, index) => (
            <div
              key={index}
              className="preview-img"
              onClick={() => removeItem(index)}
            >
              <div className="cross-box">
                <div className="cross-btn">❌</div>
              </div>
              <img src={img} alt="preview" className="img" />
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="form_btn">
        submit
      </button>
    </form>
  );
}

export default App;
