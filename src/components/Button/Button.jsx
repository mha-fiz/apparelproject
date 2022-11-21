import "./Button.scss";

const BUTTON_TYPES = {
  inverted: "inverted",
  google: "google-sign-in",
  disabled: "disabled",
};

export function Button({
  children,
  buttonType,
  disabled = false,
  ...otherProps
}) {
  return (
    <button
      className={`button-container ${BUTTON_TYPES[buttonType]}`}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
}
