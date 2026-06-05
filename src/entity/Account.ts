export class Account {

    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password?: string;
    role: string;
    active?: boolean;
    createdAt?: string;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.password = '';
        this.role = 'USER';
        this.active = true;
    }

}