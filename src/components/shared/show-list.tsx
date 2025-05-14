// src/components/show-list.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { ShowCard } from '@/components/shared/show-card';
import { useShowStore } from '@/stores/show';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  className?: string;
}

export const ShowList: React.FC<Props> = ({ className }) => {
  const { shows, isLoading } = useShowStore();
  console.log('Shows in ShowList:', shows, 'isLoading:', isLoading);
  return (
    <div className={cn('grid grid-cols-4 gap-4 mt-4', className)}>
      {isLoading ? (
        [...new Array(10)].map((_, index) => (
          <Skeleton key={index} className="w-[250px] h-[250px]" />
        ))
      ) : shows.length === 0 ? (
        <div>No shows available</div>
      ) : (
        shows.map((show) => (
          <ShowCard show={show} key={show.id} href={`shows/${show.id}/book`} />
        ))
      )}
    </div>
  );
};