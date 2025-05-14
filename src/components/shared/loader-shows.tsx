"use client"
import { useShowStore } from "@/stores/show";
import React, { useEffect } from "react";
import { ClimbingBoxLoader } from "react-spinners";

interface Props {
    className?: string;
    children?: React.ReactNode; 
    showContentOnlyAfterLoad?: boolean;
}

export const LoaderShows: React.FC<Props> = ({ className, children, showContentOnlyAfterLoad = false }) => {
    const fetchShowsData = useShowStore((state) => state.fetchShows);
    const isLoading = useShowStore((state) => state.isLoading);
    const showsAreLoaded = useShowStore((state) => state._shows.length > 0);

    useEffect(() => {
        if (!showsAreLoaded && !isLoading) {
            fetchShowsData();
        }
    }, [fetchShowsData, showsAreLoaded, isLoading]);

    if (isLoading && !showsAreLoaded) {
        return (
            <div className={isLoading ? "flex items-center justify-center min-h-screen" : ""}>
                {isLoading ? <ClimbingBoxLoader color="#ffffff"/> : children}
            </div>
        );
    }

    if (showContentOnlyAfterLoad) {
        if (showsAreLoaded) {
            return <>{children}</>;
        }
        return null;
    }

    return <>{children}</>;
}