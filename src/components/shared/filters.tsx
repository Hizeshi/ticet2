"use client"
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useShowStore } from '@/stores/show';
import { XIcon } from 'lucide-react';

const ALL_ARTISTS_VALUE = "ALL_ARTISTS";
const ALL_LOCATIONS_VALUE = "ALL_LOCATIONS";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const artists = useShowStore((state) => state.artists);
    const locations = useShowStore((state) => state.locations);
    const applyFilters = useShowStore((state) => state.filterShows);

    const [selectedArtist, setSelectedArtist] = React.useState(ALL_ARTISTS_VALUE);
    const [selectedLocation, setSelectedLocation] = React.useState(ALL_LOCATIONS_VALUE);
    const [selectedDate, setSelectedDate] = React.useState('');

    const areFiltersActive =
        selectedArtist !== ALL_ARTISTS_VALUE ||
        selectedLocation !== ALL_LOCATIONS_VALUE ||
        selectedDate !== '';

    useEffect(() => {
        applyFilters({
            artist: selectedArtist === ALL_ARTISTS_VALUE ? '' : selectedArtist,
            location: selectedLocation === ALL_LOCATIONS_VALUE ? '' : selectedLocation,
            date: selectedDate
        });
    }, [selectedArtist, selectedLocation, selectedDate, applyFilters]);

    const handleClear = () => {
        setSelectedArtist(ALL_ARTISTS_VALUE);
        setSelectedLocation(ALL_LOCATIONS_VALUE);
        setSelectedDate('');
    }

    return (
        <div className={cn(
            'grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 mb-5 items-end',
            className
        )}>
            {}
            <div className={cn(
                "contents md:grid md:gap-4",
                areFiltersActive ? "md:col-span-3 md:grid-cols-3" : "md:col-span-4 md:grid-cols-3"
            )}>
                {}
                <div className="flex flex-col">
                    <label htmlFor="artist-select" className="mb-1 text-sm font-medium text-foreground/80">Artist</label>
                    <Select value={selectedArtist} onValueChange={setSelectedArtist} name="artist-select">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="All Artists" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={ALL_ARTISTS_VALUE}>All Artists</SelectItem>
                                {artists.map((artist) => (
                                    <SelectItem key={artist} value={artist}>{artist}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {}
                <div className="flex flex-col">
                    <label htmlFor="location-select" className="mb-1 text-sm font-medium text-foreground/80">Location</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation} name="location-select">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="All Locations" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={ALL_LOCATIONS_VALUE}>All Locations</SelectItem>
                                {locations.map((location) => (
                                    <SelectItem key={location} value={location}>{location}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {}
                <div className="flex flex-col">
                    <label htmlFor="date-input" className="mb-1 text-sm font-medium text-foreground/80">Date</label>
                    <Input
                        id="date-input"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        placeholder="Date"
                    />
                </div>
            </div>

            {}
            {areFiltersActive && (
                <div className="flex items-end h-full md:col-start-4"> {}
                    <Button
                        onClick={handleClear}
                        variant={'ghost'}
                        size={'sm'}
                        className="w-full text-muted-foreground hover:text-destructive md:w-auto"
                        aria-label="Clear filters"
                    >
                        <XIcon className="mr-1 h-4 w-4" /> Clear
                    </Button>
                </div>
            )}
        </div>
    );
}