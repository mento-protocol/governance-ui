import styles from './locks-list.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {Button, DropdownButton, Loader} from "@components/_shared";
import classNames from 'classnames';
import {useUserStore} from "@/app/store";
import {useEffect} from "react";


interface LocksListProps extends BaseComponentProps {

}
export const LocksList = ({}: LocksListProps) => {

    const {locks, getLocks, isLocksFetching} = useUserStore();

    useEffect(() => {
        getLocks();
    }, [getLocks]);

    return <div className={styles.locksList}>
        <div className={styles.locksList__row}>
            <div className={classNames(styles.title, styles.item)}>Amount MENTO</div>
            <div className={classNames(styles.title, styles.item)}>Amount veMENTO</div>
            <div className={classNames(styles.title, styles.item)}>Expires on</div>
        </div>
        {isLocksFetching && <Loader isCenter />}
        {locks.map((lock, index) => <div className={styles.locksList__row} key={index}>
            <div className={styles.divider}></div>
            <div className={styles.item}>{lock.amountMNTO}</div>
            <div className={styles.item}>{lock.amountsVeMNTO}</div>
            <div className={styles.item}>{lock.expireDate.toLocaleDateString()}</div>
            <div>
                <DropdownButton className="md:hidden" theme="clear">
                    <DropdownButton.Dropdown>
                        <DropdownButton.Element onClick={() => {}}>
                            Extend lock
                        </DropdownButton.Element>
                    </DropdownButton.Dropdown>
                </DropdownButton>
                <Button className="md:static" block theme="clear">Extend lock</Button>
            </div>
        </div>)}
    </div>
}