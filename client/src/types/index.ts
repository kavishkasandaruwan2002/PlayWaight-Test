export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
}

export interface Hotel {
    _id: string;
    name: string;
    location: string;
    description: string;
    price: number;
    rating: number;
    image: string;
}

export interface Vehicle {
    _id: string;
    name: string;
    type: string;
    price_per_day: number;
    image: string;
    description?: string;
}

export interface Booking {
    _id?: string;
    hotel?: string;
    vehicle?: string;
    date: string;
    status: string;
}

export interface Profile extends User {
    bookings: Booking[];
}
