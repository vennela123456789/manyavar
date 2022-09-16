import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactUs } from '../constants/constants';
// import { Captchaservice } from '../services/captcha.service';
import { ContactUsService } from '../services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
public loginForm!:FormGroup;
public code:number=0;
public details:any;
public submitted:boolean=false;
public radioVisible:boolean=false;
isCaptchaMissMatched :boolean=false;
orderVisible:boolean=false;
storeVisible:boolean=false;
random:any;

  constructor(private router:Router,private fb:FormBuilder,private http:HttpClient,private contact:ContactUsService) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      selectedSubject:[''],
      selectType:[''],
      orderNumber:[''],
      StoreCity:[''],
      StoreName:[''],
      Name:['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],
      City:['',Validators.required],
      
      Email:['',[Validators.required,Validators.email]],
      Mobile:['',[Validators.required,Validators.pattern(/^[6789][0-9]{9}$/)]],
      Feedback:['',Validators.required],
      Captcha:['',Validators.required],
    })
    // this.code=this.captcha.GenerateCode();
    //this.canvasGenerate(this.code)
    this.newCode();
  }
 
login(){

}
 newCode(){
  let random = Math.floor(Math.random() * (999999 - 100000)) + 100000
  // this.code=this.captcha.GenerateCode();
  this.random=random;
  this.canvasGenerate(random)
}
userDetails(){
  debugger
 this.submitted=true;
 if(this.loginForm.invalid){
  return
 }

 else{


 
  let req={
    CaptchaCode:this.loginForm.value.Captcha,
    City:  this.loginForm.value.City,
    CurrencyId: "1",
    CustomerToken: "",
    Email: this.loginForm.value.Email,
    Enquiry: this.loginForm.value.Feedback,
    FirstName: this.loginForm.value.Name,
    IsOnlineOrder:  this.loginForm.value.selectType,
    MobileCountryCode : 1,
    Phone :   this.loginForm.value.Mobile,
    StoreCity :  this.loginForm.value.storeCity,
    StoreName : this.loginForm.value.storeName,
    Subject: this.loginForm.value.selectedSubject,
    OrderNumber:this.loginForm.value.orderNumber





   
  }
  this.contact.postService(ContactUs,req).subscribe(data=>this.details=data)
 }
  
}

radiolist(event:any){
 if(event.target.value=='Customer Feedback' || event.target.value=='Returns & Exchange' || event.target.value=='Payments'){
  this.radioVisible=true;
 }
else{
  this.radioVisible=false;
}
}
orderNumber(event:any){
  if(event.target.value=='true'){
    this.orderVisible=true;
    this.storeVisible=false;
  }
}
storeName(e:any){
  if(e.target.value=='false'){
    this.storeVisible=true;
    this.orderVisible=false;
  }
}
canvasGenerate(code:any){
  var c =<HTMLCanvasElement> document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
ctx?.clearRect(0,0,c.height,c.width);
ctx!.font="20px Arial"
  ctx?.fillText(code,10,50);
}
validateCaptcha(e:any){
  if(e.target.value==this.random){
this.isCaptchaMissMatched=false;
  }
  else{
this.isCaptchaMissMatched=true;
  }
}
}

export class FormData {
  OrderNumber:string ='';
  StoreName :string = '';
  StoreCity :string ='';

}
