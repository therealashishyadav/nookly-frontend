// export class JwtToken {
//     email: string;
//     password: string;
//     token: string;

//     constructor() {
//         this.email = '';
//         this.password = '';
//         this.token = '';
//     }
// }

export class JwtToken {
    token: string;
    refreshToken: string;

    constructor() {
        this.token = '';
        this.refreshToken = '';
    }
}