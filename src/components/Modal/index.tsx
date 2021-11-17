import React from 'react';
import classes from './Modal.module.css';

interface ModalProps {
    closeModal: () => void;
    deleteHandler: () => void;
}

const Modal: React.FC<ModalProps> = ({closeModal, deleteHandler}) => {
    return (
        <div className={classes.Modal}>
            <div className={classes.ModalContent}>
                <h3 style={{textAlign: 'center'}}>Вы действительно хотите удалить пользователя?</h3>
                <div className={classes.ModalBtns}>
                    <button className={classes.ButtonAgree} onClick={deleteHandler}>Да</button>
                    <button className={classes.ButtonCancel} onClick={closeModal}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
