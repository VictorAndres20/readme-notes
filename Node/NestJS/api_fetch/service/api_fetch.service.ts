import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import 'dotenv/config';
import { ApiFetchEmail } from "../model/api_fetch.model";

@Injectable()
export class ApiFetchService {

    constructor(
        private readonly httpService: HttpService,
    ) {}

    async sendFetchEmail(model: ApiFetchEmail): Promise<boolean> {
        try{
            await this.httpService.axiosRef.post(process.env.EMAIL_SERVICE, model);
            return true;
        } catch(err) {
            console.log(err.message);
            return false;
        }
    }
}