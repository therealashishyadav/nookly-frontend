export class LoginEntity {
    email: string;
    phone: string;
    password: string;
    roles: string;

    constructor() {
        this.email = '';
        this.phone = '';
        this.password = '';
        this.roles = '';
    }
}
