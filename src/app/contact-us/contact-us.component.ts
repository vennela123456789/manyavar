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
  public loginForm!: FormGroup;
  public code: number = 0;
  public details: any;
  public submitted: boolean = false;
  public radioVisible: boolean = false;
  isCaptchaMissMatched: boolean = false;
  orderVisible: boolean = false;
  storeVisible: boolean = false;
  random: any;

  // userCaptcha: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private contact: ContactUsService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({


      Name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
      City: ['', Validators.required],

      Email: ['', [Validators.required, Validators.pattern(

        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      )]],
      Mobile: ['', [Validators.required, Validators.pattern(/^[6789][0-9]{9}$/)]],
      Feedback: ['', [Validators.required, Validators.maxLength(32)]],
      Captcha: ['', [Validators.required]]
    })

    this.newCode();
  }

  newCode() {
    let random = Math.floor(Math.random() * (999999 - 100000)) + 100000

    this.random = random;
    this.canvasGenerate(random);
  }
  userDetails() {
    debugger
    this.submitted = false;
    if (this.loginForm.valid && this.isCaptchaMissMatched == false) {

      let req: FormData = new FormData;
      req.CaptchaCode = this.loginForm.value.Captcha;
      req.City = this.loginForm.value.City;

      req.Email = this.loginForm.value.Email;
      req.Enquiry = this.loginForm.value.Feedback;
      req.FirstName = this.loginForm.value.Name;


      req.Phone = this.loginForm.value.Mobile;

      req.Subject = this.loginForm.value.selectedSubject;


      if (this.radioInputVisible == 'online') {
        req.IsOnlineOrder = true;
        req.OrderNumber = this.loginForm.value.orderNumber;

      }
      else if (this.radioInputVisible == 'offline') {
        req.IsOnlineOrder = false;
        req.StoreName = this.loginForm.value.storeName;
        req.StoreCity = this.loginForm.value.storeCity;
      }
      else {
        req.OrderNumber = '';
        req.StoreCity = '';
        req.StoreName = ''
      }
      this.contact.postService(ContactUs, req).subscribe(data => this.details = data)
      alert('success')
      this.loginForm.reset();
      this.submitted = false;

    }
    else {
      this.submitted = true;
    }

  }

  radiolistVisible!: string;
  radiolist(e: any) {
    this.radiolistVisible = e.target.value;
    this.radioInputVisible = '';
  }

  radioInputVisible!: string;
  radioInput(e: any) {
    this.radioInputVisible = e.target.value;
  }

  canvasGenerate(code: any) {
    var c = <HTMLCanvasElement>document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx?.clearRect(0, 0, c.height, c.width);
    ctx!.font = "20px Arial"
    ctx?.fillText(code, 10, 50);
  }

  validateCaptcha(e: any) {

    if (e.target.value != this.random && e.target.value.length > 0) {
      this.isCaptchaMissMatched = true;
      // this.userCaptcha = false;
    }

    else {
      //   this.userCaptcha = true;
      this.isCaptchaMissMatched = false;
    }
  }
}

export class FormData {
  CaptchaCode!: number;
  City!: string;
  CurrencyId: string = "1";
  CustomerToken: string = "";
  Email!: string;
  Enquiry!: string;
  FirstName!: string;
  IsOnlineOrder!: boolean;
  MobileCountryCode: number = 1;
  Phone!: number;
  StoreCity!: string;
  StoreName!: string;
  Subject!: string;
  OrderNumber!: string;


}
