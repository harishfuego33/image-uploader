// eslint-disable-next-line react/prop-types
const Product = ({ title, cost, description, imageUrl }) => {
  return (
    <div className="product__box">
      <div className="product__box-img">
        <img src={imageUrl} alt={title} loading="lazy" className="img" />
      </div>
      <h1 className="product__box-title">{title}</h1>
      <h3>Rs {cost}</h3>
      <p className="product__box-description">{description}</p>
    </div>
  );
};

export default Product;
