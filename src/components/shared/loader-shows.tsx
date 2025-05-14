"use client"
import {useShowStore} from "@/stores/show";
import React, {useEffect} from "react";
import {ClimbingBoxLoader} from "react-spinners";

interface Props {
    children?: React.ReactNode;
    className?: string;
}

export const LoaderShows:React.FC<Props> = ({className, children}) => {
 
    const fetchShows = useShowStore((store) => store.fetchShows);
     useEffect(() => {
        console.log('Fetching shows...');
         fetchShows();
     }, [fetchShows]);

    return (
        <div>
            <ClimbingBoxLoader />
        </div>
    );
}
