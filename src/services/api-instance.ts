import axios from "axios";


export const apiInstance = axios.create({
    baseURL: "https://apic.polytech.kz/api/v1/"
})