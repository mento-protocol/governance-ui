"use client";
import {Button, Badge} from "@components/_shared";

export default function Page() {

    return (
        <div className="flex flex-col justify-center place-items-center">
            <div>
                <h2 className="text-3xl py-3">Buttons</h2>
                <div className="flex flex-row gap-2 justify-center place-items-center flex-wrap">
                    <Button type="primary">Primary</Button>
                    <Button type="secondary">Secondary</Button>
                    <Button type="tertiary">Tertiary</Button>
                    <Button type="danger">Danger</Button>
                    <Button type="warning">Warning</Button>
                    <Button type="success">Success</Button>
                    <Button type="info">Info</Button>
                    <Button type="link">Link</Button>
                    <Button type="clear">Clear</Button>
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