import React, {FC, MouseEvent, useEffect, useState} from "react";
import {IUser} from "../../data/interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {
    removeInvitation,
    setInvitationsFromLocalStorage,
    setInvitationsToLocalStorage,
    setInvitedPeople
} from "../../store/slice/usersSlice";

import styles from './Invitations.module.scss';
import Button from "../General/Button/Button";
import {useGetAllUsersQuery} from "../../store/api/UsersAPI";

interface Props {
    users?: IUser[];
    title: string;
}

const Invitations:FC<Props> = ({title}) => {

    const {data} = useGetAllUsersQuery('');

    const [isSentMessage, setIsSentMessage] = useState<boolean>(false);
    const [sentMessageText, setSentMessageText] = useState<string>('');

    const {invitations, users, invitedPeople} = useAppSelector(state => state.users);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            dispatch(setInvitationsFromLocalStorage());
        }
    },[data]);

    useEffect(() => {
        if (invitations && users) {
            dispatch(setInvitedPeople());
        }
    },[invitations, users])

    return (
        <div className={styles.root}>
            <h1>{title}</h1>

            {!invitedPeople.length &&
              <div style={{marginTop: '30px', marginBottom: '10px', textAlign: 'center', color: 'gray'}}>
                No persons in invitations list</div>
            }

            {invitedPeople?.length > 0 && (
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <td>№</td>
                        <td>Name</td>
                        <td>Nickname</td>
                        <td>Action</td>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(invitedPeople) && invitedPeople.map((person: any, idx: number) => {
                            if (!person) return 'No persons in invitations list';

                            return (
                                <tr key={person.id}>
                                    <td>{idx + 1}</td>
                                    <td>{person?.name}</td>
                                    <td>{person?.nickname}</td>
                                    <td>
                                        <Button
                                            onClickCallback={(e: MouseEvent<HTMLButtonElement>) => {
                                                dispatch(removeInvitation(person.id));
                                            }}>
                                            X
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                    )}
                    </tbody>
                </table>
            )}

            <Button isFullWidth bgColor="lightblue" textColor="black" text="Save" onClickCallback={() => {
                dispatch(setInvitationsToLocalStorage());
                setTimeout(() => {
                    setIsSentMessage(false);
                }, 2000);
                setIsSentMessage(true);
                setSentMessageText("Invitations list have been updated successfully!");
            }} marginTop={40}/>

            {isSentMessage && <div style={{marginTop: '30px', textAlign: 'center'}}>{sentMessageText}</div>}
        </div>
    );
}

export default Invitations;