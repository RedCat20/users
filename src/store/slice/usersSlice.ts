import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import usersApi from "../api/UsersAPI";
import store from "../index";
import {IUser} from "../../data/interfaces";

type UsersState = {
    users: IUser[],
    invitations: string[],
    invitedPeople: IUser[],
}

const initialState: UsersState = {
    users: [],
    invitations: [],
    invitedPeople: [],
}

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setInvitations: (state, {payload}: PayloadAction<string[]>) => {
            state.invitations = payload;
            const key = 'invited users';
            localStorage.setItem(key, JSON.stringify(state.invitations));
        },
        setInvitationsFromLocalStorage: (state) => {
            const key = 'invited users';
            const usersStr = localStorage.getItem(key);

            let invitedUsers = [];
            if (usersStr) {
                invitedUsers = JSON.parse(usersStr);
            }

            state.invitations = invitedUsers;
        },
        setInvitationsToLocalStorage: (state) => {
            const key = 'invited users';
            localStorage.setItem(key, JSON.stringify(state.invitations));
        },
        setInvitedPeople: (state) => {
            if (state.invitations.length > 0) {
                state.invitedPeople = state.invitations.map((id => state.users.filter(user => user.id === id)[0]));
            } else {
                state.invitedPeople = [];
            }
        },
        addInvitation: (state, {payload}: PayloadAction<string>) => { },
        removeInvitation: (state, {payload}: PayloadAction<string>) => {
            state.invitations = state.invitations.filter((item: any) => {
                return item !== payload
            });
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            usersApi.endpoints.getAllUsers.matchFulfilled,
            (state, {payload}) => {
                console.log('fulfilled');
                state.users = payload.map((el: any, idx: number) => { return { ...el, id: String(idx) } });
            }
        )
        builder.addMatcher(
            usersApi.endpoints.getAllUsers.matchPending,
            (state, {payload}) => {
                console.log('pending');
            }
        )
        builder.addMatcher(
            usersApi.endpoints.getAllUsers.matchRejected,
            (state, {payload}) => {
                console.log('rejected');
            }
        )
    }
});

export const {setInvitations, setInvitationsFromLocalStorage,setInvitationsToLocalStorage,setInvitedPeople,addInvitation,removeInvitation} = usersSlice.actions;

export default usersSlice.reducer;

export type RootState = ReturnType<typeof store.getState>;