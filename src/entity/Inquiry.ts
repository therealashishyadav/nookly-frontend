export class Inquiry {
    id?: number;

    fullName: string;
    phone: string;
    email: string;
    message: string;
    inquiryType: string;
    location: string;

    constructor() {
         this.id = undefined;
       this.fullName = '';
       this.phone = '';
       this.email = '';
       this.message = '';
       this.inquiryType = '';
       this.location = '';
    }

}

