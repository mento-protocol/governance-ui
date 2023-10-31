"use client";
import {Button, Badge} from "@components/_shared";

const Page = () => {
    return (
        <div className="flex flex-col justify-center place-items-center">
            <div>
                <h2 className="text-3xl py-3">Buttons</h2>
                <div className="flex flex-row gap-2 justify-center place-items-center flex-wrap">
                    <Button theme="primary">Primary</Button>
                    <Button theme="secondary">Secondary</Button>
                    <Button theme="tertiary">Tertiary</Button>
                    <Button theme="danger">Danger</Button>
                    <Button theme="warning">Warning</Button>
                    <Button theme="success">Success</Button>
                    <Button theme="info">Info</Button>
                    <Button theme="link">Link</Button>
                    <Button theme="clear">Clear</Button>
                </div>
            </div>
            
            <div>
                <h2 className="text-3xl py-3">Badges</h2>
                <div className="flex flex-row gap-2 justify-center place-items-center flex-wrap">
                    <Badge type="primary">Primary</Badge>
                    <Badge type="secondary">Secondary</Badge>
                    <Badge type="tertiary">Tertiary</Badge>
                    <Badge type="danger">Danger</Badge>
                    <Badge type="warning">Warning</Badge>
                    <Badge type="success">Success</Badge>
                    <Badge type="info">Info</Badge>
                </div>
            </div>
        </div>
    )
}

export default Page;