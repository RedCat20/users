import React, {FC} from 'react';
import styles from './Spinner.module.scss';

interface Props {
    text?: string;
}

const Spinner: FC<Props> = ({text}) => {
    return (
        <div className={styles.root}>{text || 'Loading...'}</div>
    );
}

export default Spinner;
