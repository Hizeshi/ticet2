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
}

export const useShowStore = create<ShowStore>((set, get) => ({
    shows: [],
    _shows: [],
    isLoading: false,
    artists: [],
    locations: [],

    getShowById: (id: number) => {
        return get()._shows.find((show) => show.id === id);
    },

    fetchShows: async () => {
        if (get().isLoading || get()._shows.length > 0) {
            if(get()._shows.length > 0) console.log("Shows already in store.");
            return;
        }
        console.log("Fetching shows from API...");
        set({ isLoading: true });
        try {
            const fetchedShows = await Api.show.getAll();
            
            const uniqueArtists = [...new Set(fetchedShows.map((show) => show.artist).filter(Boolean))];
            const uniqueLocations = [...new Set(fetchedShows.map((show) => show.location).filter(Boolean))];
            
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

}));