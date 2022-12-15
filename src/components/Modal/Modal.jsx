import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox, ModalImg } from './Modal.styled';
import propTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, modalImage, modalAlt }) => {
  useEffect(() => {
    const hendleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', hendleKeyDown);
    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  }, [closeModal]);

  const hendleClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={hendleClickBackdrop}>
      <ModalBox>
        <ModalImg src={modalImage} alt={modalAlt} />
      </ModalBox>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  modalAlt: propTypes.string.isRequired,
  modalImage: propTypes.string.isRequired,
  closeModal: propTypes.func.isRequired,
};
