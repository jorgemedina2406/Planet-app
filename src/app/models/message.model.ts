export class Message {

    constructor(
        public user_id: number,
        public from_name: string,
        public from_phone: string,
        public from_message: string,
        public property_id: number,
        public _id?: number
    ) { }

}