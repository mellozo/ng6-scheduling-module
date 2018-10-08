import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';


@Injectable()
export class DataService {
    baseUrl: string = "http://localhost/traveloggiaservices/api"

    constructor(private objHttp: HttpClient) {

    }

    getSites(mapID: string) {
        mapID = "22243" // paris environs
        const url = `${this.baseUrl}/SiteList/${mapID}`
        return this.objHttp.get(url)
    }






}