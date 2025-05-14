import {cn} from "@/lib/utils";
import React from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Container} from "@/components/shared/container";



interface Props {
    className?: string;
}

export const Header:React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('bg-indigo-700 p-2', className)}>
            <Container className="flex items-center justify-between">
                <div>
                    <Link href="/" className="text-yellow-50">EuroSkills Concerts</Link>
                </div>
                <div>
                    <span className="m-2">
                        Already booked?
                    </span>
                    <Button variant="outline" asChild>
                        <Link href="/">Get Tickets</Link>
                    </Button>
                </div>
            </Container>
        </div>
    );
};