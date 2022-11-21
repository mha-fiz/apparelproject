import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../";
import "./Hero.scss";

export const Hero = () => {
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  return (
    <div className="hero-image-container">
      <div className="hero-image-overlay" />
      <div className="hero-description">
        <h1>{translate("heroText")}</h1>
        <Button onClick={() => navigate("/shop")}>{translate("browse")}</Button>
      </div>
    </div>
  );
};
