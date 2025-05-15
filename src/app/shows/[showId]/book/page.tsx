'use client';

import { PlaceShow } from "./components/placeshow";
import { SelectedPlaces } from "./components/selectedplaces";
import { InputDetails } from "./components/inputdetails";
import { Booking } from "./components/booking";
import { ShowCard } from "@/components/shared/show-card";

import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useShowStore } from "@/stores/show";
import { Show } from "@/@types/show";
import { Skeleton } from "@/components/ui/skeleton";
import { useRowsStore } from "@/stores/rows";

export default function BookShowPage() {
  const params = useParams<{ showId: string }>();
  const showId = Number(params.showId);
  const { rows, fetchRows } = useRowsStore();
 
  const getShowByIdFromStore = useShowStore((state) => state.getShowById);
  const fetchShowsGlobal = useShowStore((state) => state.fetchShows);
  const allShowsInStore = useShowStore((state) => state._shows);

  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);
  const [currentShow, setCurrentShow] = useState<Show | undefined | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
   fetchRows(show.concertId, show.id);
  }, [])

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (allShowsInStore.length === 0) {
        fetchShowsGlobal().then(() => {
          const foundShow = getShowByIdFromStore(showId);
          setCurrentShow(foundShow);
        });
      } else {
        const foundShow = getShowByIdFromStore(showId);
        setCurrentShow(foundShow);
      }
    }
  }, [isClient, showId, getShowByIdFromStore, fetchShowsGlobal, allShowsInStore]);

  if (!isClient || currentShow === null) {
    return (
      <Container className="py-8">
        <Title className="mb-4">Book seats for your show</Title>
        <div className="max-w-xs mx-auto mb-6">
            <Skeleton className="h-40 w-full" /> {}
        </div>
        <div className="text-center p-10">Loading show details...</div>
        {}
      </Container>
    );
  }

  if (currentShow === undefined) {
    return (
      <Container className="py-8">
        <Title className="mb-4">Book seats for your show</Title>
        <div className="text-center p-10">Show not found.</div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Title className="mb-4 text-center">Book seats for your show</Title>
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
                <PlaceShow className="p-4 border rounded-lg shadow" />
            </div>
            <SelectedPlaces className="p-4 border rounded-lg shadow" showId={params.showId} />
          </div>
        )
        : (
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 mt-6">
            <SelectedPlaces className="p-4 border rounded-lg shadow md:max-w-xs" showId={params.showId} />  
            <div className="p-6 border rounded-lg shadow bg-card">
              <h2 className="text-xl font-semibold mb-6 text-center">
                Please enter your details
              </h2>
              <div className="space-y-6"> {}
                <InputDetails className="" /> {}
                {}
                <Booking className="" showId={params.showId} /> 
              </div>
            </div>
          </div>
        )
      }
    </Container>
  );
}