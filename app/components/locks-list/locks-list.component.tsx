import styles from './locks-list.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {locksMock} from "@/app/helpers/mocks";
import {Button, DropdownButton} from "@components/_shared";


interface LocksListProps extends BaseComponentProps {

}
export const LocksList = ({}: LocksListProps) => {

    const locks = locksMock;

    return <div className={styles.locksList}>
        <div className={styles.locksList__row}>
            <div className={styles.item}>Amount MNTO</div>
            <div className={styles.item}>Amount veMNTO</div>
            <div className={styles.item}>Expires on</div>
        </div>
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
                <Button className="hidden md:static" block theme="clear">Extend lock</Button>
            </div>
        </div>)}
    </div>
}