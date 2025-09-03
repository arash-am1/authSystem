export interface RandomUser {
    name: { title: string; first: string; last: string };
    email: string;
    picture: { large: string; medium: string; thumbnail: string };
}

export interface AppUser extends RandomUser {
    phone: string; // normalized user-entered phone (e.g. +989xxxxxxxxx)
}
