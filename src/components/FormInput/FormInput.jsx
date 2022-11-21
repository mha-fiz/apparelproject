import { useSelector } from "react-redux";
import "./FormInput.scss";

function FormInput({ label, ...otherOptions }) {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  return (
    <div className="group">
      <input
        className={`form-input ${isDarkTheme ? "dark" : ""}`}
        {...otherOptions}
      />
      {label && (
        <label
          className={`form-input-label ${
            otherOptions.value.length ? "shrink" : ""
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
}

export default FormInput;
