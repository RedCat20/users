import React, {FC, ReactNode, useEffect, useState} from 'react';
import './UserList.scss';
import Button from "../General/Button/Button";
import UserItem from "./UserItem/UserItem";
import {useAppSelector} from "../../hooks/storeHooks";

interface Props {
    title: string;
}

const UserList: FC<Props> = ({title}) => {
    const {users} = useAppSelector(state => state.users);

    const [userList, setUserList] = useState<ReactNode>('');
    const [isAll, setIsAll] = useState<boolean>(false);

    const getUsersData = (): ReactNode | undefined => {
        if (!users?.length) return;

        if (isAll) {
            return users.map((el: any, idx: number) => <UserItem key={idx} user={el}/>);
        }

        return users.slice(0, 3).map((el: any, idx: number) => <UserItem key={idx} user={el}/>);
    }

    useEffect(() => {
        setUserList(prev => getUsersData());
    },[users, isAll]);

    return (
        <>
            <h1>{title}</h1>

            <div className="user-list">
                <div className="users">
                    {userList}
                </div>

                <Button
                    onClickCallback={() => setIsAll(!isAll)}
                    text={isAll ? 'Collapse all' : 'View all'}
                    isFullWidth={true}
                />
            </div>
        </>
    );
}

export default UserList;
