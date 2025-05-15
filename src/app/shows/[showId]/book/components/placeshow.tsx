"use client"
import { cn } from "@/lib/utils";
import { useRowsStore } from "@/stores/rows";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Row, Seat } from "@/@types/row";

interface Props {
    className?: string;

    onSeatSelect: (seatId: string, rowId: string, seatNumber: string | number, isSelectedCurrently: boolean) => void;
    selectedSeats: Array<{ rowId: string; seatId: string }>;
}

export const PlaceShow: React.FC<Props> = ({ className, onSeatSelect, selectedSeats }) => {
    const params = useParams<{ showId: string, concertId?: string }>();
    
    const { rows, isLoading, error, fetchRows } = useRowsStore();

    const showId = params.showId ? Number(params.showId) : null;
    const concertId = params.concertId ? Number(params.concertId) : null; 

    useEffect(() => {
        if (concertId !== null && showId !== null && !isLoading && rows.length === 0) {
            fetchRows(concertId, showId);
        }
    }, [fetchRows, concertId, showId, isLoading, rows.length]);


    if (isLoading) {
        return <div className={cn("p-4 text-center", className)}>Loading seat map...</div>;
    }

    if (error) {
        return <div className={cn("p-4 text-center text-destructive", className)}>Error loading seat map: {error}</div>;
    }

    if (rows.length === 0) {
        return <div className={cn("p-4 text-center text-muted-foreground", className)}>No seat information available. Ensure concert and show IDs are correct.</div>;
    }

    return (
        <div className={cn("p-4 border rounded-lg bg-card shadow-sm", className)}>
            <div className="bg-gray-300 h-10 w-3/4 mx-auto mb-8 flex items-center justify-center text-sm text-gray-700 rounded">
                STAGE
            </div>
            <div className="space-y-3">
                {rows.map((row: Row) => (
                    <div key={row.id} className="flex items-center">
                        <span className="w-20 mr-3 text-sm text-muted-foreground text-right tabular-nums">{row.name}</span>
                        <div className="flex flex-wrap gap-1.5">
                            {row.seats.map((seat: Seat) => {
                                const isCurrentlySelected = selectedSeats.some(
                                    s => s.rowId === String(row.id) && s.seatId === String(seat.id)
                                );
                                const seatVariant = seat.isUnavailable
                                    ? 'secondary'
                                    : isCurrentlySelected
                                        ? 'default'
                                        : 'outline';

                                return (
                                    <Button
                                        key={seat.id}
                                        variant={seatVariant as any}
                                        size="sm"
                                        className={cn(
                                            "w-9 h-9 p-0 text-xs tabular-nums",
                                            seat.isUnavailable ? "opacity-50 cursor-not-allowed bg-muted text-muted-foreground" : "",
                                            isCurrentlySelected && !seat.isUnavailable ? "ring-2 ring-primary ring-offset-1" : ""
                                        )}
                                        disabled={seat.isUnavailable}
                                        onClick={() => 
                                            !seat.isUnavailable && onSeatSelect(String(seat.id), String(row.id), seat.number, isCurrentlySelected)
                                        }
                                        aria-pressed={isCurrentlySelected}
                                    >
                                        {seat.number}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}