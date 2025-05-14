import React, {useState} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {useShowStore} from "@/stores/show";
import {Button} from "@/components/ui/button";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { artists, locations, filterShows } = useShowStore()
    const [ artist, setArtist ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ date, setDate ] = useState("");
    const onChengeArtist = ( value: string ) => {
        setArtist(value);
        filterShows(value, location, date);
    }
    const onChengeLocation = ( value: string ) => {
        setLocation(value);
        filterShows(artist, value, date);
    }
    const onChengeDate = ( value: string ) => {
        setDate(value);
        filterShows(artist, location, value);
    }
    const onReset = () => {
        setArtist("");
        setLocation("");
        setDate("");
        filterShows("", "", "");
    }
        

    return (
        <div className={cn("flex gap-4 mt-4 ", className)}>
            <Select onValueChange={onChengeArtist}> 
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Artist"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        artists.map((artist) => (
                            <SelectItem key={artist} value={artist}>
                                {artist}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

            <Select onValueChange={onChengeLocation}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Location"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        locations.map((location) => (
                            <SelectItem key={location} value={location}>
                                {location}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

            <Input onChange={(e) => onChengeDate(e.target.value)} type="date"/>

        
            {
                (artist || location || date) && <Button  onClick={onReset}>Reset</Button>
            }
            
        </div>
    );
}