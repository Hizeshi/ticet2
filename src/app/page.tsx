'use client';
import { Title } from '@/components/shared/title';
import React from 'react';
import { Filters } from '@/components/shared/filters';
import { ShowList } from '@/components/shared/show-list';
import { LoaderShows } from '@/components/shared/loader-shows';

export default function Home() {
  return (
    <>
      <Title className="mt-4">Checkout these amazing concerts in Graz.</Title>
      {}
      <LoaderShows showContentOnlyAfterLoad={true}>
        <Filters />
        <ShowList />
      </LoaderShows>
    </>
  );
}