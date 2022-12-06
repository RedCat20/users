import React, {FC} from 'react';
import './UserItem.scss';
import Button from "../../General/Button/Button";
import {images} from "../../../data/images";
import {IUser} from "../../../data/interfaces";
import Avatar from "../../General/Avatar/Avatar";
import {useNavigate} from "react-router-dom";

interface Props {
    user: IUser;
}

const UserItem: FC<Props> = ({user}) => {

    const navigate = useNavigate();

    return (
        <div className="user-item">
            <Avatar img={images[Number(user?.id)]} width={75}/>
            <div>
                <div className="user-name">{user?.name}</div>
                <div className="user-nickname">{user?.nickname}</div>
            </div>
            <Button onClickCallback={() => { navigate(`/users/${user?.id}`) }}>View</Button>
        </div>
    );
}

export default UserItem;
