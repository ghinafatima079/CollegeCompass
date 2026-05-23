import axios from "axios";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL;

export const getColleges = async (
    search = "",
    location = "",
    page = 1,
    limit = 9
) => {

    const response = await axios.get(
        `${API_BASE_URL}/colleges`,
        {
            params: {
                search,
                location,
                page,
                limit,
            },
        }
    );

    return response.data;
};

export const getCollegeById = async (
    id: string
) => {

    const response = await axios.get(
        `${API_BASE_URL}/colleges/${id}`
    );

    return response.data;
};