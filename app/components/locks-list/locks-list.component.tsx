import styles from './locks-list.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {locksMock} from "@/app/helpers/mocks";
import {Button} from "@components/_shared";


interface LocksListProps extends BaseComponentProps {

}
export const LocksList = ({}: LocksListProps) => {

    const locks = locksMock;

    return <div className={styles.locksList}>
        <div className={styles.locksList__row}>
            <div>Amount MNTO</div>
            <div>Amount veMNTO</div>
            <div>Expires on</div>
        </div>
        {locks.map((lock, index) => <div className={styles.locksList__row} key={index}>
            <div>{lock.amountMNTO}</div>
            <div>{lock.amountsVeMNTO}</div>
            <div>{lock.expireDate.toLocaleDateString()}</div>
            <div>
                <Button block theme="clear">Extend lock</Button>
            </div>
        </div>)}
    </div>
}