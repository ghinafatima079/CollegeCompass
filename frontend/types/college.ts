export interface Course {
    id: number;
    name: string;
    duration: string;
    fees: number;
}

export interface Review {
    id: number;
    author: string;
    rating: number;
    comment: string;
}

export interface College {
    id: number;
    name: string;
    location: string;
    fees: number;
    rating: number;
    placements_percentage: number;
    avg_package: number;
    description: string;
    image_url: string;

    courses: Course[];
    reviews: Review[];
}