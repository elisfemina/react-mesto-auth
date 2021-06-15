import React from "react";

function ImagePopup() {
  return (
    <>
      <div className="popup popup-photo">
        <div className="popup-photo__container">
          <button
            type="button"
            className="popup__close-button popup-photo__close-button"></button>
          <img className="popup-photo__image" src="#" alt="#" />
          <h2 className="popup-photo__heading">" "</h2>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;
