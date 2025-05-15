'use client';

import { PlaceShow } from "./components/placeshow";
import { SelectedPlaces } from "./components/selectedplaces";
import { InputDetails } from "./components/inputdetails";
import { Booking } from "./components/booking";
import { ShowCard } from "@/components/shared/show-card";

import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { useShowStore } from "@/stores/show";
import { Show as ShowType } from "@/@types/show";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookShowPage() {
  const params = useParams<{ showId: string; concertId?: string }>();
  const showId = Number(params.showId);
  
  const initialConcertId = params.concertId ? Number(params.concertId) : null; 

  const getShowByIdFromStore = useShowStore((state) => state.getShowById);
  const fetchShowsGlobal = useShowStore((state) => state.fetchShows);
  const allShowsInStore = useShowStore((state) => state._shows);

  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);
  const [currentShow, setCurrentShow] = useState<ShowType | undefined | null>(null);
  const [derivedConcertId, setDerivedConcertId] = useState<number | null>(initialConcertId);

  const [selectedSeats, setSelectedSeats] = useState<Array<{ rowId: string; seatId: string; seatNumber?: string | number; rowName?: string }>>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (allShowsInStore.length === 0) {
        fetchShowsGlobal().then(() => {
          const foundShow = getShowByIdFromStore(showId);
          setCurrentShow(foundShow);
          if (!initialConcertId && foundShow && typeof (foundShow as any).concertId === 'number') {
            setDerivedConcertId((foundShow as any).concertId);
          } else if (initialConcertId) {
            setDerivedConcertId(initialConcertId);
          }
        });
      } else {
        const foundShow = getShowByIdFromStore(showId);
        setCurrentShow(foundShow);
        if (!initialConcertId && foundShow && typeof (foundShow as any).concertId === 'number') {
            setDerivedConcertId((foundShow as any).concertId);
        } else if (initialConcertId) {
            setDerivedConcertId(initialConcertId);
        }
      }
    }
  }, [isClient, showId, getShowByIdFromStore, fetchShowsGlobal, allShowsInStore, initialConcertId]);

  const handleSeatSelect = useCallback((seatId: string, rowId: string, seatNumber: string | number, isSelectedCurrently: boolean) => {
    setSelectedSeats(prevSelectedSeats => {
        if (isSelectedCurrently) {
            return prevSelectedSeats.filter(s => !(s.seatId === seatId && s.rowId === rowId));
        } else {
            return [...prevSelectedSeats, { seatId, rowId, seatNumber }];
        }
    });
  }, []);

  if (!isClient || currentShow === null) {
    return (
      <Container className="py-8">
        <Title className="mb-4 text-center">Book seats for your show</Title>
        <div className="max-w-xs mx-auto mb-6">
            <Skeleton className="h-24 w-full" /> {}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <Skeleton className="lg:col-span-2 h-96" /> {}
            <Skeleton className="h-64" /> {}
        </div>
      </Container>
    );
  }

  if (currentShow === undefined) {
    return (
      <Container className="py-8">
        <Title className="mb-4 text-center">Book seats for your show</Title>
        <div className="text-center p-10 text-destructive">Show not found.</div>
      </Container>
    );
  }

  if (derivedConcertId === null && !isBookingFormVisible) {
      return (
          <Container className="py-8">
              <Title className="mb-4 text-center">Book seats for your show</Title>
              <ShowCard show={currentShow} className="max-w-xs mx-auto mb-6"/>
              <div className="text-center p-10 text-muted-foreground">Loading concert information to display seats... (Concert ID missing)</div>
          </Container>
      );
  }

  return (
    <Container className="py-8">
      <Title className="mb-4 text-center">Book seats for your show</Title>
      {}
      <ShowCard show={currentShow} className="max-w-xs mx-auto mb-6"/>
      
      <div className="text-center my-4">
        <button 
            onClick={() => setIsBookingFormVisible(prev => !prev)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
            Toggle to: {isBookingFormVisible ? 'Seat Selection View' : 'Enter Details View'}
        </button>
      </div>

      {!isBookingFormVisible 
        ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <div className="lg:col-span-2">
                {}
                {derivedConcertId !== null && showId !== null && (
                    <PlaceShow 
                        className="p-4 border rounded-lg shadow" 
                        onSeatSelect={handleSeatSelect}
                        selectedSeats={selectedSeats}
                    />
                )}
            </div>
            <SelectedPlaces 
                className="p-4 border rounded-lg shadow" 
                showId={params.showId} 
                selectedSeats={selectedSeats}
                onSeatRemove={handleSeatSelect}
            />
          </div>
        )
        : (
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 mt-6">
            <SelectedPlaces 
                className="p-4 border rounded-lg shadow md:max-w-xs" 
                showId={params.showId} 
                selectedSeats={selectedSeats}
                onSeatRemove={handleSeatSelect}
            />  
            <div className="p-6 border rounded-lg shadow bg-card">
              <h2 className="text-xl font-semibold mb-6 text-center">
                Please enter your details
              </h2>
              <div className="space-y-6">
                <InputDetails className="" concertId={derivedConcertId} showId={showId} selectedSeats={selectedSeats} />
                {}
                {}
              </div>
            </div>
          </div>
        )
      }
    </Container>
  );
}