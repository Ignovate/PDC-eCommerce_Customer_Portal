export class CONFIG {
    // For QA version
    //  public static _url: string = "https://suzukiml-qa.tti-global.com/_api/web/en_us/";
    // For Developemet version 
    public static _url: string = "http://167.99.153.79:8081/gaia-ecom-service/api/v1.0/";
     // For build version 
    // public static _url: string = "http://localhost:8081/gaia-ecom-service/api/v1.0/";
    // public static _urlbanner: string = "http://167.99.153.79:8080/gaia_ecom_admin/configurationservices/";

    //Common variables//
    public static _loggedIn: boolean=true;
    public static _user_mobile: any='';
    public static _active_url:any='';
    public static forgot_cont:boolean = false;
    public static forgot_user:any;
    public static forgot_mobile_no:any;
    public static showmenu: boolean=true;


    constructor() { }
}   