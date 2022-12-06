import React, {FC} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useGetAllUsersQuery} from "../store/api/UsersAPI";
import styles from './App.module.scss';

import AppRoutes from "./AppRoutes";
import Header from "./Layout/Header/Header";
import SideTitle from "./Layout/SideTitle/SideTitle";

const App:FC = () => {

    const {data} = useGetAllUsersQuery('');

    return (
        <Router>
            <div className={styles.root}>

                <SideTitle/>

                <div className={styles.wrapper}>
                   <Header/>
                    <div className={styles.content}>
                        <AppRoutes/>
                    </div>
                </div>
            </div>
        </Router>
  );
}

export default App;
