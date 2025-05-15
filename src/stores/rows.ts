import { AxiosResponse } from "axios";
import { create } from "zustand";


interface RowsStoreProps {
    rows: Row[];
    isLoading: boolean;

    fetchRows: (concertId: number, showId: number) => Promise<void>;
}

interface ErrorResponseNotExist {

}

export const useRowsStore = create<RowsStoreProps>((set) => ({
  rows: [],
  isLoading: false,

  fetchRows: (concertId: number, showId: number) => {
    try {
        set ({ isLoading: true });
        const rows = await Api.rows.getAll(concertId, showId);
        set({ rows});
    }catch (error: AxiosResponse) {
      console.error("Failed to fetch rows:", error);
      throw error.response.data
    } finally {
        set({ isLoading: false });
        }
  }

}));