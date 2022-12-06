import React, {FC} from 'react';
import styles from './Avatar.module.scss';

interface Props {
    img: string;
    width?: number | string;
}

const Avatar: FC<Props> = ({ img,
                             width}) => {

    return (
        <div className={styles.root} style={{
            background: `url('${img}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            width: `${width ? width : 100}px`,
            height: `${width ? width : 100}px`}}
        />
    );
}

export default Avatar;
