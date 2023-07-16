declare namespace Response {
    // serve for pagination
    interface IPaginationResult<T> {
        items: T[];
        count: number;
    }

    interface IShortUser {
        id: number;
        name: string;
        avatar: string;
    }

    interface IUser {
        id: number;
        lastName: string;
        firstName: string;
        dob: string; // Date of birth
        avatar: string;
        phone: string;
        address: string;
        isPublic: string;
        CCCD: string; // identification number
    }
}

declare namespace I18nType {
    type Language = "en" | "vi" | "ja";
}