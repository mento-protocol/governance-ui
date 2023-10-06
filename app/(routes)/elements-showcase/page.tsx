"use client";
import {Button} from "@components/_shared";
import {Badge} from "@components/_shared/badge/badge.component";

export default function Page() {

    const noop = () => {};

    return (
        <div className="flex flex-col justify-center place-items-center">
            <div>
                <h2 className="text-3xl py-3">Buttons</h2>
                <div className="flex flex-row gap-2 justify-center place-items-center flex-wrap">
                    <Button type="primary" onClick={noop}>Primary</Button>
                    <Button type="secondary" onClick={noop}>Secondary</Button>
                    <Button type="tertiary" onClick={noop}>Tertiary</Button>
                    <Button type="danger" onClick={noop}>Danger</Button>
                    <Button type="warning" onClick={noop}>Warning</Button>
                    <Button type="success" onClick={noop}>Success</Button>
                    <Button type="info" onClick={noop}>Info</Button>
                    <Button type="link" onClick={noop}>Link</Button>
                    <Button type="clear" onClick={noop}>Clear</Button>
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