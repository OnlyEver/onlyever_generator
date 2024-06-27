/// this method will call out atlas function and will write to a doc, incase of any errors: 
/// this is only for developmemt use

import axios from "axios";


export class ErrorLogger{
    data: any;
    constructor(data: any){
        this.data = data;
    }

    async log() {
        try{
       let response = await axios.post(
            'https://us-east-1.aws.data.mongodb-api.com/app/oe-phase1-tkmsy/endpoint/oe_gen_logger',
            {
                data: this.data,
            },
            {
                headers : {
                    "Content-Type" : ['application/json']
                }
            }

        );
    return response;}catch(e){
        console.log(e)
    }
    }
}