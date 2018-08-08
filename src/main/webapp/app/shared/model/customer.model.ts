export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export interface ICustomer {
    id?: number;
    firstName?: string;
    lastName?: string;
    gender?: Gender;
    city?: string;
}

export class Customer implements ICustomer {
    constructor(public id?: number, public firstName?: string, public lastName?: string, public gender?: Gender, public city?: string) {}
}
