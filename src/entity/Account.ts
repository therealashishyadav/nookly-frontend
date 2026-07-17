export class Account {

    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password?: string;
    role: string;
    active?: boolean;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.role = 'USER';
        this.active = true;
    }

}