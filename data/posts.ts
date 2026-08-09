export interface Post {
    postId: string;
    userId: string;
    itemTitle: string;
    category: "Lost" | "Found";
    itemDescription: string;
    date: string;
}

export const POSTS: Post[] = [
    {
        postId: "1",
        userId: "23-50176-1",
        itemTitle: "Scientific Calculator (Casio FX-991EX)",
        category: "Lost",
        itemDescription: "Lost a black Casio scientific calculator near the CSE lab on the 3rd floor. It has my student ID written with a permanent marker on the back cover.",
        date: "June 15, 2026"
    },
    {
        postId: "2",
        userId: "21-44210-2",
        itemTitle: "Blue Hydro Flask Water Bottle",
        category: "Found",
        itemDescription: "Found a dented dark blue Hydro Flask left behind on a bench near the cafeteria. Claim it by describing the stickers on it.",
        date: "June 14, 2026"
    },
    {
        postId: "3",
        userId: "22-58912-1",
        itemTitle: "Student ID Card",
        category: "Found",
        itemDescription: "Found a Department of CSE student ID card near the central library entrance.",
        date: "June 12, 2026"
    },
    {
        postId: "4",
        userId: "23-50176-1",
        itemTitle: "HP EliteBook Charger",
        category: "Lost",
        itemDescription: "Left my 65W USB-C laptop charger plugged into an outlet in the main auditorium after the seminar.",
        date: "June 10, 2026"
    }
];