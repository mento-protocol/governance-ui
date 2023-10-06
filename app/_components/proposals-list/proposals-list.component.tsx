import {Card} from "@components/_shared";
import styles from "./proposals-list.module.scss";

interface ProposalsListProps {
}

export const ProposalsListComponent = () => {

    return (<>
            <h2 className="text-xl font-semibold mt-10 mb-6">Proposals</h2>
            <Card block>
                <div className={styles.proposals_list}>
                    <div className={styles.proposals_list__header_element}>

                    </div>
                </div>
            </Card>
        </>

    );

}