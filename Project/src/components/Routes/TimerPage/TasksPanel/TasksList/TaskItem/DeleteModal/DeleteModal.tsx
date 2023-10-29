import React from 'react';

import { CommonModal } from 'components/common-components/CommonModal';

import { ReactComponent as XSvg } from './svg/x.svg';

import styles from './deletemodal.module.scss';

interface DeleteModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  deleteCallback: () => void;
}

export function DeleteModal({
  isOpen,
  setIsOpen,
  deleteCallback,
}: DeleteModalProps) {
  return (
    <CommonModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <button
          className={`${styles.closeButton} clear-button`}
          onClick={closeModal}
        >
          <XSvg />
        </button>
        <h2 className={styles.title}>Удалить задачу?</h2>
        <button
          className="primary-button primary-button_red"
          onClick={deleteCallback}
        >
          Удалить
        </button>
        <button className="underlined-button clear-button" onClick={closeModal}>
          Отмена
        </button>
      </div>
    </CommonModal>
  );

  function closeModal() {
    setIsOpen(false);
  }
}
