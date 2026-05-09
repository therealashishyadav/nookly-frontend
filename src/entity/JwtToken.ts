export class JwtToken {
    email: string;
    password: string;
    token: string;

    constructor() {
        this.email = '';
        this.password = '';
        this.token = '';
    }
}