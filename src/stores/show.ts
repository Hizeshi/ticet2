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
            if (get()._shows.length > 0) {
            }
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
        const { artist, location, date: dateFilterInput } = filters;
        let filteredShows = [...get()._shows];

        if (artist && artist.trim() !== "") {
            filteredShows = filteredShows.filter((show: Show) => show.artist === artist);
        }

        if (location && location.trim() !== "") {
            filteredShows = filteredShows.filter((show: Show) => show.location === location);
        }

        if (dateFilterInput && dateFilterInput.trim() !== "") {
            let filterDateObj: Date | null = null;
            try {
                filterDateObj = new Date(dateFilterInput);
                if (isNaN(filterDateObj.getTime())) {
                    console.warn("Invalid date provided in filter input:", dateFilterInput);
                    filterDateObj = null;
                }
            } catch (e) {
                console.error("Error parsing date from filter input:", dateFilterInput, e);
                filterDateObj = null;
            }

            if (filterDateObj) {
                const filterDateComparisonString = filterDateObj.toISOString().split('T')[0];

                filteredShows = filteredShows.filter((show: Show) => {
                    if (typeof show.date === 'string' && show.date.trim() !== '') {
                        const showDateObj = new Date(show.date);
                        if (isNaN(showDateObj.getTime())) {
                            console.warn(`Invalid date string for show ${show.id}: "${show.date}". Excluding from date filter.`);
                            return false;
                        }
                        const showDateComparisonString = showDateObj.toISOString().split('T')[0];
                        return showDateComparisonString === filterDateComparisonString;
                    } else {
                        return false;
                    }
                });
            }
        }
        set({ shows: filteredShows });
    },
}));