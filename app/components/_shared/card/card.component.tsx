import styles from './card.module.scss';
import classNames from "classnames";
import BaseComponentProps from "@interfaces/base-component-props.interface";


interface CardPartialProps extends BaseComponentProps {
    children: React.ReactNode;
}

interface CardProps extends CardPartialProps {
    block?: boolean;
    transparent?: boolean;
}

const CardHeader = ({children}: CardPartialProps) => {
    return <header className={styles.card__header}>{children}</header>;
}

const CardFooter = ({children}: CardPartialProps) => {
    return <footer className={styles.card__footer}>{children}</footer>;
}


export const Card = ({children, className, block, style, transparent}: CardProps) => {
    return <div
        className={classNames(styles.card, 'bg-white', block && styles.block, transparent && styles.transparent, className)}
        style={style}>
        {children}
    </div>
}

Card.Header = CardHeader;
Card.Footer = CardFooter;