import { useNavigate } from "react-router-dom";
import { Button } from "../";
import "./Hero.scss";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-image-container">
      <div className="hero-image-overlay" />
      <div className="hero-description">
        <h1>NEW COLLECTION IS OUT!</h1>
        <Button onClick={() => navigate("/shop")}>Browse</Button>
      </div>
    </div>
  );
};
