import {Injectable} from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class Captchaservice {
    public GenerateCode(){
        let a=Math.random()*10;
        let b=Math.random()*10;
        let c=Math.random()*10;
        let d=Math.random()*10;
        let e=Math.random()*10;
        let code:any=`${Math.round(a)}${Math.round(b)}${Math.round(c)}${Math.round(d)}${Math.round(e)}`;
        let codee=Math.floor(code)
   return codee;
    }
}