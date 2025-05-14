import { create } from "zustand";
import { Show } from "@/@types/show";
import { Api } from "@/services/api";

interface ShowStore {
    shows: Show[];
    _shows: Show[];
    isLoading: boolean;
    artists: string[];
    locations: string[];
    getShowById: (id: number) => Show | undefined;
    fetchShows: () => Promise<void>;
    filterShows: (filters: { artist: string; location: string; date: string }) => void;
}

export const useShowStore = create<ShowStore>((set, get) => ({
    shows: [],
    _shows: [],
    isLoading: false,
    artists: [],
    locations: [],

    getShowById: (id: number) => {
        return get()._shows.find((show: Show) => show.id === id);
    },

    fetchShows: async () => {
        if (get().isLoading || get()._shows.length > 0) {
            if (get()._shows.length > 0) console.log("Shows already in store.");
            return;
        }
        console.log("Fetching shows from API...");
        set({ isLoading: true });
        try {
            const fetchedShows: Show[] = await Api.show.getAll();

            const artistsFromShows = fetchedShows
                .map((show: Show) => show.artist)
                .filter((artist): artist is string => typeof artist === 'string' && artist.trim() !== '');
            const uniqueArtists = [...new Set(artistsFromShows)];

            const locationsFromShows = fetchedShows
                .map((show: Show) => show.location)
                .filter((location): location is string => typeof location === 'string' && location.trim() !== '');
            const uniqueLocations = [...new Set(locationsFromShows)];

            set({
                shows: fetchedShows,
                _shows: fetchedShows,
                artists: uniqueArtists,
                locations: uniqueLocations,
                isLoading: false
            });
            console.log("Shows fetched successfully:", fetchedShows.length);
        } catch (error) {
            console.error("Failed to fetch shows:", error);
            set({ isLoading: false, shows: [], _shows: [] });
        }
    },

    filterShows: (filters) => {
        const { artist, location, date } = filters;
        let filteredShows = [...get()._shows];

        if (artist && artist !== "") {
            filteredShows = filteredShows.filter((show) => show.artist === artist);
        }

        if (location && location !== "") {
            filteredShows = filteredShows.filter((show) => show.location === location);
        }

        if (date) {
            try {
                const filterDateStr = new Date(date).toISOString().split('T')[0];

                filteredShows = filteredShows.filter((show) => {
                    let showDateStr: string;
                    if (typeof show.date === 'string') {
                        const d = new Date(show.date);
                        if (!isNaN(d.getTime())) {
                            showDateStr = d.toISOString().split('T')[0];
                        } else {
                            console.warn(`Invalid date format for show ${show.id}: ${show.date}`);
                            return false;
                        }
                    } else if (show.date instanceof Date) {
                        showDateStr = show.date.toISOString().split('T')[0];
                    } else {
                        console.warn(`Unknown date type for show ${show.id}`);
                        return false;
                    }
                    return showDateStr === filterDateStr;
                });
            } catch (e) {
                console.error("Error parsing date for filtering:", date, e);
            }
        }
        set({ shows: filteredShows });
        console.log("Filtered shows:", filteredShows.length);
    },
}));