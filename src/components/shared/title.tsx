import React from "react";
import {cn} from "@/lib/utils";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

export const Title: React.FC<Props> = ({ className, children }) => {
    return (
        <h1 className={cn("text-2xl font-bold text-center", className)}>
            { children }
        </h1>
    );
};