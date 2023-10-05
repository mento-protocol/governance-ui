import styles from './card.module.scss';
import classNames from "classnames";


interface CardPartialProps {
    children: React.ReactNode;

}
interface CardProps extends CardPartialProps{
    className?: string;
    block?: boolean;
}

const CardHeader = ({children}: CardPartialProps) => {
    return <header className={styles.card__header}>{children}</header>;
}

const CardFooter = ({children}: CardPartialProps) => {
    return <footer className={styles.card__footer}>{children}</footer>;
}


export const Card = ({children, className, block} : CardProps) => {
    return <div className={classNames(styles.card, block && styles.block, className)}>
        {children}
    </div>
}

Card.Header = CardHeader;
Card.Footer = CardFooter;