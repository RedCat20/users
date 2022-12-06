import {Link} from "react-router-dom";
import {TITLES} from "../../../data/constants";
import React, {FC} from "react";

import styles from './Header.module.scss';

const Header:FC = () => {

    return (
        <header className={styles.root}>
            <div>
                <Link to="/users">{TITLES.users}</Link>
                <Link to="/invitations">{TITLES.invitations}</Link>
            </div>
            <div>
                <Link to="/cabinet">{TITLES.products}</Link>
            </div>
        </header>
    );
}

export default Header;