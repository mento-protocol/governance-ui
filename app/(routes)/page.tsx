import Image from 'next/image'
import {Button, Card} from "@components/shared";
import classNames from "classnames";
import {MentoTextLogoIcon} from "@components/icons";
import {MentoIcon} from "@components/icons/mento.icon";

export default function Home() {
  return (
    <main className="flex flex-col place-items-center p-6">
      <h1>
        <MentoTextLogoIcon />
      </h1>
      <h2 className="text-xl mt-4">Claim your part and participate in <br /> shaping the future of digital assets</h2>

        <Card className="mt-8" block>
            <Card.Header>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row justify-start place-items-center gap-2 text-3xl font-bold">
                        <MentoIcon />
                        Mento
                    </div>
                    <Button type="clear">
                        Create new proposal
                    </Button>
                </div>
            </Card.Header>
            <p>Transparent Digital Asset Solutions</p>

        </Card>
    </main>
  )
}
