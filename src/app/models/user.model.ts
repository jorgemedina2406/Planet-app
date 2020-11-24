
export class User {

    constructor(
        public name: string,
        public lastname: string,
        public email: string,
        public password: string,
        public mobile_phone?: string,
        public phone?: string,
        public picture?: string,
        public vip?: boolean,
        public verified?: boolean,
        public activated?: boolean,
        public admin?: boolean,
        public google?: boolean,
        public linkedin?: boolean,
        public id?: number
    ) { }

}
