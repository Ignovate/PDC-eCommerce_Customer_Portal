import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ok } from 'assert';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { LOCATION_INITIALIZED } from '@angular/common';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { makeStateKey } from '@angular/platform-browser';
import { materialize } from 'rxjs/operators';
import { markParentViewsForCheckProjectedViews } from '@angular/core/src/view/util';
import { HyperService } from '../core/services/http.service';
 
 

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent  { 
     
    constructor(private server: HyperService ) { 
        

    }
    
   
}