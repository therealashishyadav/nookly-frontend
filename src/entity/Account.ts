export class Account {

    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: string;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.password = '';
        this.role = 'USER';
    }

}