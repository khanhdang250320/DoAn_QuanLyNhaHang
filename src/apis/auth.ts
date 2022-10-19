import axios from "axios";
import fetchApi from "./fetchApi";

const version = {
    v1: "/api/v1",
};
const hostname = `${version.v1}/auth`;

export const login = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await fetchApi.post(`${hostname}/login/ADMIN`, {
            ...body
        }, {
            headers: {
                ...header
            }
        });
        return result.data.user
    } catch (error) {
        console.log(error)
    }
}