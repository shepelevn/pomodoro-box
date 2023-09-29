import React from 'react';
import Modal from 'react-modal';

import styles from './commonmodal.module.scss';

interface CommonModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export function CommonModal({ isOpen, setIsOpen, children }: CommonModalProps) {
  return (
    <div>
      <Modal
        className={styles.modal}
        overlayClassName={styles.overlay}
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {children}
      </Modal>
    </div>
  );

  function closeModal() {
    setIsOpen(false);
  }
}
