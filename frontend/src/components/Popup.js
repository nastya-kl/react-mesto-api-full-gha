import useClosedByEsc from "../hooks/useClosedByEsc";

const Popup = ({ isOpen, onClose, name, children }) => {

  useClosedByEsc({isOpen, onClose});

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={handleOverlay}
    >
      <div className={`popup__container_type_${name}`}>
        {children}
        <button
          className="popup__close-icon"
          type="button"
          aria-label="Кнопка закрыть окно"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;
