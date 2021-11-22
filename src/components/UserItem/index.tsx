import React, { useState } from 'react';
import classes from './UserItem.module.css';

import closeIcon from '../../assets/close-icon.svg';
import { IUser } from '../../store/types/user';
import { formatDate } from '../../utils/dateFormat';
import { useActions } from '../../hooks/useActions';
import Modal from '../Modal';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface UserItemProps extends IUser {

}

const UserItem: React.FC<UserItemProps> = ({id, username, email, rating, registration_date}) => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const {users} = useTypedSelector(state => state.user);
    const {deleteUser, setTotalPages} = useActions();

    const closeModalHandler = () => {
        setModalActive(false);
    };

    const deleteUserHandler = () => {
        setModalActive(false);
        deleteUser(id);
        setTotalPages(users.length - 1);
    };

    return (
        <>
            <div className={classes.UserItem}>
                <div className={classes.UserItemName}>{username}</div>
                <div>{email}</div>
                <div>{formatDate(registration_date)}</div>
                <div>{rating}</div>
                <div onClick={() => setModalActive(true)}>
                    <img className={classes.UserItemIcon} src={closeIcon} alt="Delete"/>
                </div>
            </div>
            {modalActive &&
            <Modal closeModal={closeModalHandler} deleteHandler={deleteUserHandler}/>}
        </>

    );
};

export default UserItem;
