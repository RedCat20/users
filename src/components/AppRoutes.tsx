import {Navigate, Route, Routes} from "react-router-dom";
import React, {FC, Suspense} from "react";

import Spinner from "./General/Spinner/Spinner";
import {TITLES} from "../data/constants";

import UserInfo from "./UserList/UserInfo/UserInfo";
import Invitations from "./Invitations/Invitations";
import Products from "./Products/Products";

const UserList = React.lazy(() => import('./UserList/UserList'));

const AppRoutes:FC = () => {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/users"/>}/>

            <Route path={"/users"}
                   index
                   element={
                       <Suspense fallback={
                           <Spinner/>
                       }>
                           <UserList title={TITLES.users}/>
                       </Suspense>
                   }
            />
            <Route path={"/users/:id"}
                   element={
                       <Suspense fallback={
                           <Spinner/>
                       }>
                           <UserInfo title=""/>
                       </Suspense>}
            />
            <Route path={"/invitations"}
                   element={
                       <Suspense fallback={
                           <Spinner/>
                       }>
                           <Invitations title={TITLES.invitations}/>
                       </Suspense>}
            />
            <Route path={"/cabinet"}
                   element={
                       <Suspense fallback={
                           <Spinner/>
                       }>
                           <Products title={TITLES.products}/>
                       </Suspense>}
            />

            <Route path="/*"
                   element={
                       <Suspense fallback={
                           <Spinner/>
                       }>
                           <h1>Error 404. Not found</h1>
                       </Suspense>
                   }
            />
        </Routes>
    );
}

export default AppRoutes;