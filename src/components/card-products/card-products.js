import "./card-products.scss";
import Button from "../button/button";
import { CartContext } from '../../contexts/cart-context'
import { useContext } from "react";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCard } = useContext(CartContext)

  const addProductToCart = () => addItemToCard(product)

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>Add to card</Button>
    </div>
  );
};

export default ProductCard;
