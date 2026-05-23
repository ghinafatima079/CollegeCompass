const API_URL =
    process.env.NEXT_PUBLIC_API_URL;


export async function saveCollege(
    userId: string,
    collegeId: number
) {

    const response = await fetch(

        `${API_URL}/saved?user_id=${userId}&college_id=${collegeId}`,

        {
            method: "POST"
        }

    );

    return response.json();
}


export async function removeSavedCollege(
    userId: string,
    collegeId: number
) {

    const response = await fetch(

        `${API_URL}/saved/${collegeId}?user_id=${userId}`,

        {
            method: "DELETE"
        }

    );

    return response.json();
}


export async function getSavedColleges(
    userId: string
) {

    const response = await fetch(

        `${API_URL}/saved/${userId}`

    );

    return response.json();
}