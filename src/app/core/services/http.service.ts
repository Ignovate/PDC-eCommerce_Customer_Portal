import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { CONFIG } from '../../../app/config';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Router } from "@angular/router";
import { LocalStore } from '../../store/local-store';

@Injectable()

export class HyperService {
    private BASE_URL: string = '';
    private local_jwt: any = {}
    private header_token: string;
    private user_role: string;

    constructor(public http: Http, public router: Router) {
        this.http = http;
    }

    //GET METHOD//
    get(endPoint: string) {
        let headers: Headers = new Headers();
        let requestoptions: RequestOptions;
        headers.append("Cache-Control", 'no-cache');
        headers.append("Pragma", 'no-cache');
        headers.append("Content-Type", 'application/json');
        headers.append("Authorization", 'Bearer ' + LocalStore.get('token'));
        headers.append('Access-Control-Allow-Origin', '*');
        requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: CONFIG._url + endPoint,
            headers: headers
        })
        return this.http.request(new Request(requestoptions))
            .toPromise()
            .then((res) => {
                return {
                    status: res.status,
                    result: res.json()
                }
            }, (err) => {
                if (err.status == 401) {
                    // let msg = err.json();
                    // alert(msg.result.message)
                    return {
                        status: err.status,
                        result: err.json()
                    }
                } else {
                    return {
                        status: err.status,
                        result: err.json()
                    };
                }

            })
    }
 
    //POST METHOD//
    post(endPoint: string, data: any, isJSON: boolean = true): any {
        let headers: Headers = new Headers();
        let requestoptions: RequestOptions;
        let theBody: any;
        if (isJSON) {
            theBody = JSON.stringify(data);
        } else {
            theBody = data
        }
        headers.append("Content-Type", 'application/json');
        headers.append("Authorization", 'Bearer ' + LocalStore.get('token'));
        headers.append('Access-Control-Allow-Origin', '*');
        requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: CONFIG._url + endPoint,
            headers: headers,
            body: theBody
        })
        return this.http.request(new Request(requestoptions))
            .toPromise()
            .then((res) => {
                return {
                    status: res.status,
                    result: res.json()
                }
            }, (err) => {
                if (err.status == 401) {
                    return {
                        status: err.status,
                        result: err.json()
                    };
                } else {
                    return {
                        status: err.status,
                        result: err.json()
                    };
                }

            })
    }
 //PUT METHOD//
 put(endPoint: string, data: any, isJSON: boolean = true): any {
    let headers: Headers = new Headers();
    let requestoptions: RequestOptions;
    let theBody: any;
    if (isJSON) {
        theBody = JSON.stringify(data);
    } else {
        theBody = data
    }
    headers.append("Content-Type", 'application/json');
    headers.append("Authorization", 'Bearer ' + LocalStore.get('token'));
    headers.append('Access-Control-Allow-Origin', '*');
    requestoptions = new RequestOptions({
        method: RequestMethod.Put,
        url: CONFIG._url + endPoint,
        headers: headers,
        body: theBody
    })
    return this.http.request(new Request(requestoptions))
        .toPromise()
        .then((res) => {
            return {
                status: res.status,
                result: res.json()
            }
        }, (err) => {
            if (err.status == 401) {
                return {
                    status: err.status,
                    result: err.json()
                };
            } else {
                return {
                    status: err.status,
                    result: err.json()
                };
            }

        })
}
    fileUpload(endPoint: string, data, tokenRequired, finalCallBack) {
        var xhr;
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }

        var formData = new FormData();
        if (data != undefined && data != '') {
            for (var key in data) {
                formData.append(key, data[key]);
            }

        }
       
        xhr.upload.addEventListener("loadstart", function (e) {
        }, false);
        xhr.upload.addEventListener("load", function (e) {
        }, false);
        xhr.upload.addEventListener('error', function (e) {
        }, false);
        xhr.onreadystatechange = function (e) {
            setTimeout(() => {
                if (finalCallBack != undefined) finalCallBack(xhr.responseText);
            }, 2000);
        };
        xhr.open('post', CONFIG._url + endPoint, true);
        if (tokenRequired) xhr.setRequestHeader("Authorization", 'Bearer ' + LocalStore.get('token'));
        xhr.upload.addEventListener("progress", function (e) {
            if (e.lengthComputable) {
                let percentage = Math.round((e.loaded * 100) / e.total);
                
                if(data!=undefined && data!=''){
                    for (var key in data) {
                        data[key].progress = percentage + "%";
                        // console.log( data[key].progress ,"percent");
                    }
                }
            }
        }, false);
        xhr.send(formData);
    }


    //DELETE METHOD//
    delete(endPoint: string, data: any = undefined, isJSON: boolean = true): any {
        let headers: Headers = new Headers();
        let requestoptions: RequestOptions;
        let theBody = {};
        if (data != undefined) {
            theBody = (isJSON) ? JSON.stringify(data) : data;
        }
        headers.append("Content-Type", 'application/json');
        headers.append("Authorization", 'Bearer ' + LocalStore.get('token'));
        headers.append('Access-Control-Allow-Origin', '*');
        requestoptions = new RequestOptions({
            method: RequestMethod.Delete,
            url: CONFIG._url + endPoint,
            headers: headers,
            body: theBody
        })
        return this.http.request(new Request(requestoptions))
            .toPromise()
            .then((res) => {
                return {
                    status: res.status,
                    result: res.json()
                }
            }, (err) => {
                if (err.status == 401) {
                    this.logOut();
                } else {
                    return {
                        status: err.status,
                        result: err.json()
                    };
                }

            })
    }



    //EDIT METHOD//
    edit(endPoint: string, data: any, isJSON: boolean = true) {
        let headers: Headers = new Headers();
        let requestoptions: RequestOptions;
        let theBody: any;
        if (isJSON) {
            theBody = JSON.stringify(data);
        } else {
            theBody = data
        }
        headers.append("Content-Type", 'application/json');
        headers.append("Authorization", 'Bearer ' + LocalStore.get('token'));
        headers.append('Access-Control-Allow-Origin', '*');
        requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: CONFIG._url + endPoint,
            headers: headers,
            body: theBody
        })

        return this.http.request(new Request(requestoptions))
            .toPromise()
            .then((res) => {
                return {
                    status: res.status,
                    result: res.json()
                }
            }, (err) => {
                if (err.status == 401) {
                    this.logOut();
                } else {
                    return {
                        status: err.status,
                        result: err.json()
                    };
                }

            })
    }

    // HTTP ERROR HANDLE //
    handleError(error) {
        return Observable.throw(error.json().error || 'Server error');
    }

    //CLEAR DATA //
    logOut() {
        LocalStore.remove('userData');
        LocalStore.remove('user');
        // LocalStorage.createJWT();
        this.router.navigate(['']);
        //CONFIG.GET_APP.getRootNav().setRoot(SignIn);        
    }
    
}