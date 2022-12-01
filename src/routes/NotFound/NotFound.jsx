import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { useTranslation } from "react-i18next";

export const NotFound = () => {
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  return (
    <div
      style={{
        display: "flex",
        minHeight: "400px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <p style={{ textAlign: "center" }}>{translate("404Message")}</p>
        <Button onClick={() => navigate("/", { replace: true })}>
          {translate("backToHome")}
        </Button>
      </div>
    </div>
  );
};
