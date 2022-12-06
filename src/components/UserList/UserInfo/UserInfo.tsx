import React, {FC, useEffect, useState} from 'react';
import './UserInfo.css';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import {setInvitations} from "../../../store/slice/usersSlice";
import Button from "../../General/Button/Button";
import {images} from "../../../data/images";
import {IUser} from "../../../data/interfaces";
import Avatar from "../../General/Avatar/Avatar";

interface Props {
    title?: string;
}

const UserInfo: FC<Props> = ({title}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const [user, setUser] = useState<IUser | null | undefined>(null);
    const {users} = useAppSelector(state => state.users);

    const [isSentMessage, setIsSentMessage] = useState<boolean>(false);
    const [sentMessageText, setSentMessageText] = useState<string>('');

    useEffect(() => {
        let activeUser = users?.find(item => item.id === params.id);
        setUser(activeUser);
    },[users]);


    const setItemToLocalStorage = (id: string | undefined) => {
        const key = 'invited users';
        const usersStr = localStorage.getItem(key);

        let invitedUsers = [];
        if (usersStr) {
            invitedUsers = JSON.parse(usersStr);
        }

        let isUser = invitedUsers.find((item: any) => item === id);

        setTimeout(() => {
            setIsSentMessage(false);
        }, 2000);

        if (isUser) {
            setIsSentMessage(true);
            setSentMessageText("User has already added to invited people!");
            return;
        }

        invitedUsers.push(id);

        dispatch((setInvitations(invitedUsers)));

        setIsSentMessage(true);
        setSentMessageText("User has added successfully!");
    }

    return (
        <div className="user-info">
            {user &&
              <>
                <div className="title">
                    <div
                      className="cross"
                      onClick={() => { navigate(`/users`)}}>
                      X
                    </div>
                </div>

                <div className="content">
                    <div className="img-wrapper">
                        <Avatar img={images[Number(user?.id)]} width={125}/>
                    </div>

                    <div className="info">
                        <div className="name">{user?.name}</div>
                        <div className="position">{user?.position}</div>
                    </div>

                    <table>
                        <tbody>
                        <tr>
                            <td>Phone</td>
                            <td>{user?.phone}</td>
                        </tr>
                        {user?.url && (
                            <>
                                <td>URL</td>
                                <td>
                                    <a href={`${user?.url}`}>{user?.url}</a>
                                </td>
                            </>
                        )}
                        <tr>
                            <td>Email</td>
                            <td>
                              <a href={`mailto:${user?.email}`}>{user?.email}</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <Button
                      text={'Add to invited people'}
                      bgColor="slateblue"
                      textColor="white"
                      isFullWidth={true}
                      onClickCallback={() => {
                          setItemToLocalStorage(user?.id);
                      }}
                    />

                    {isSentMessage && <div style={{marginTop: '30px', textAlign: 'center'}}>{sentMessageText}</div>}
                </div>
              </>
            }
        </div>
    );
}

export default UserInfo;
