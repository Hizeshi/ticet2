import { Row } from '@/@types/row';
import { apiInstance } from './api-instance';

export const getAll = async (concertId: number, showId: number):Promise<Row[]> => {
 const res = await apiInstance.get<{rows: Row[]}>(`/concerts/${concertId}/shows/${showId}/seating`);
    return res.data.rows;
}