import "./Button.scss";

const BUTTON_TYPES = {
  inverted: "inverted",
  google: "google-sign-in",
};

export function Button({ children, buttonType, ...otherProps }) {
  return (
    <button
      className={`button-container ${BUTTON_TYPES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}
