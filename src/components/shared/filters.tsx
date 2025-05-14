"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useShowStore } from '@/stores/show';

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const artists = useShowStore((state) => state.artists);
    const locations = useShowStore((state) => state.locations);
    const applyFilters = useShowStore((state) => state.filterShows);

    const [selectedArtist, setSelectedArtist] = React.useState('');
    const [selectedLocation, setSelectedLocation] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState('');

    const handleFilter = () => {
        applyFilters({
            artist: selectedArtist,
            location: selectedLocation,
            date: selectedDate
        });
    }

    const handleClear = () => {
        setSelectedArtist('');
        setSelectedLocation('');
        setSelectedDate('');
        applyFilters({ artist: '', location: '', date: '' });
    }


    return (
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 mb-5 items-end', className)}>
            {}
            <div className="flex flex-col">
                <label htmlFor="artist-select" className="mb-1 text-sm font-medium text-gray-700">Artist</label>
                <Select value={selectedArtist} onValueChange={setSelectedArtist} name="artist-select">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Artists" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {}
                            <SelectItem value="">All Artists</SelectItem>
                            {artists.map((artist) => (
                                <SelectItem key={artist} value={artist}>{artist}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {}
            <div className="flex flex-col">
                <label htmlFor="location-select" className="mb-1 text-sm font-medium text-gray-700">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation} name="location-select">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {}
                            <SelectItem value="">All Locations</SelectItem>
                            {locations.map((location) => (
                                <SelectItem key={location} value={location}>{location}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {}
            <div className="flex flex-col">
                <label htmlFor="date-input" className="mb-1 text-sm font-medium text-gray-700">Date</label>
                <Input
                    id="date-input"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    placeholder="Date"
                />
            </div>

            {}
            <div className="flex gap-3">
                <Button onClick={handleFilter} className="w-full">Apply</Button>
                <Button onClick={handleClear} variant={'outline'} className="w-full">Clear</Button>
            </div>
        </div>
    );
}