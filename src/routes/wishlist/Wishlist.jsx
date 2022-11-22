import { useSelector } from "react-redux";
import { WishlistItem } from "../../components";
import "./Wishlist.scss";

export const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.list);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Wishlist</h1>
      <div className="wishlist-container">
        {wishlist.map((item) => (
          <WishlistItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
