import React, {FC, ReactNode, MouseEvent, useState} from 'react';
import styles from './Button.module.scss';

interface Props {
    text?: string;
    children?: ReactNode;
    width?: number;
    isFullWidth?: boolean;
    bgColor?: string;
    textColor?: string;
    marginTop?: number;
    onClickCallback: (e: MouseEvent<HTMLButtonElement>) => void;
}

const STATUS = {
    HOVERED: 'hovered',
    NORMAL: 'normal',
};

const Button: FC<Props> = ({ text,
                             children,
                             width,
                             isFullWidth,
                             bgColor,
                             textColor,
                             onClickCallback,
                             marginTop }) => {

    const [status, setStatus] = useState(STATUS.NORMAL);

    const onMouseEnter = () => {
        setStatus(STATUS.HOVERED);
    };

    const onMouseLeave = () => {
        setStatus(STATUS.NORMAL);
    };

    return (
        <button
            className={`${styles.root} ${styles[status]}`}
            style={{
                width: width ? width : isFullWidth ? '100%' : 'auto',
                background: bgColor ? bgColor : '#fff',
                color: textColor ? textColor : '#000',
                marginTop: marginTop || `${marginTop}px`
            }}
            onClick={onClickCallback}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
           <span> {text || children} </span>
        </button>
    );
}

export default Button;
