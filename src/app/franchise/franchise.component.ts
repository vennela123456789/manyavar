import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cityApi, finalApi } from '../constants/constants';
import { franchiseData } from '../data';

import { FranchiseService } from '../services/franchise.service';

@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.css'],
})
export class FranchiseComponent implements OnInit {
  submitForm!: FormGroup;
  loginForm!: FormGroup;
  captcha!: number;

  gotoSubmit!: boolean;
  cities: any;

  allFields: any;

  next: boolean = true;
  isActive!: boolean;
  submitted1!: boolean;
  submitted2!: boolean;
  details: any;
  states: any;
  IsCaptchaMissMatch: boolean = false;
  constructor(private fb: FormBuilder, private franchise: FranchiseService) {
    this.submitForm = this.fb.group({
      Country: ['', Validators.required],
      State: ['', Validators.required],
      City: ['', Validators.required],
      Location: ['', Validators.required],

      profile: [''],
      Availability: ['', Validators.required],
      Ownlocation: ['', Validators.required],
      Rentedlocation: ['', Validators.required],
      CarpetArea: ['', [Validators.required, Validators.minLength(4)]],
      Frontage: ['', Validators.required],

      Store: ['', Validators.required],
      Business: ['', Validators.required],
      Comments: ['', Validators.required],
      Captcha: ['', Validators.required],
    });
    this.loginForm = this.fb.group({
      Name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
          Validators.maxLength(128),
        ],
      ],
      Address: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9A-Za-z_#&()+!/;:.,'-]+$/),
        ],
      ],
      Mobile: ['', [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}/)]],
      Landline: ['', [Validators.required, Validators.pattern('[0-9 ]{8,12}')]],
    });
  }

  ngOnInit(): void {
    this.getCountries();
  }

  //carpet area validation
  carpet: boolean = false;
  frontageMax: boolean = false;
  carpetArea(e: any) {
    if (e.target.value < 1000) {
      this.carpet = true;
    } else if (e.target.value > 100000) {
      this.frontageMax = true;
    } else {
      this.carpet = false;
      this.frontageMax = false;
    }
  }

  //frontage area validation
  frontage: boolean = false;
  frontageArea(e: any) {
    if (e.target.value >= 20) {
      this.frontage = false;
    } else {
      this.frontage = true;
    }
  }

  nextPage() {
    if (this.loginForm.valid) {
      this.next = false;
      this.gotoSubmit = true;
      this.code();
    } else {
      this.submitted1 = true;
    }
  }
  //file type for uploading

  file1: any;
  file2: any;
  file3: any;
  error1: boolean = false;
  error2: boolean = false;
  error3: boolean = false;
  uploadFiles(event: any, id: any) {
    if (id == '1' && event.target.files.length > 0) {
      this.file1 = event.target.files;
      if (
        this.file1[0].type == 'image/jpg' ||
        this.file1[0].type == 'image/png' ||
        this.file1[0].type == 'image/gif'
      ) {
        this.error1 = false;
      } else {
        this.error1 = true;
      }
    } else if (id == '2' && event.target.files.length > 0) {
      this.file2 = event.target.files;
      if (
        this.file2[0].type == 'image/jpg' ||
        this.file2[0].type == 'image/png' ||
        this.file2[0].type == 'image/gif'
      ) {
        this.error2 = false;
      } else {
        this.error2 = true;
      }
    } else if (id == '3' && event.target.file.length > 0) {
      this.file3 = event.target.files;
      if (
        this.file3[0].type == 'image/jpg' ||
        this.file3[0].type == 'image/png' ||
        this.file3[0].type == 'image/gif'
      ) {
        this.error3 = false;
      } else {
        this.error3 = true;
      }
    }
  }

  code() {
    let captcha = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.captcha = captcha;
    this.canvasGenerate(captcha);
  }

  canvasGenerate(code: any) {
    setTimeout(() => {
      var c = <HTMLCanvasElement>document.getElementById('myCanvas');
      var ctx = c.getContext('2d');
      ctx?.clearRect(0, 0, c.height, c.width);
      ctx!.font = '20px Arial';
      ctx?.fillText(code, 10, 50);
    }, 200);
  }
  validateCaptcha(e: any) {
    if (e.target.value == this.captcha) {
      this.IsCaptchaMissMatch = false;
    } else {
      this.IsCaptchaMissMatch = true;
    }
  }
  submitPage() {
    if (
      this.submitForm.valid &&
      this.carpet == false &&
      this.frontageMax == false &&
      this.frontage == false &&
      this.error1 == false
    ) {
      let req: franchiseData = new franchiseData();

      req.FirstName = this.loginForm.value.Name;
      req.Email = this.loginForm.value.Email;
      req.Address = this.loginForm.value.Address;
      req.Mobile = this.loginForm.value.Mobile;
      req.Landline = this.loginForm.value.Landline;

      req.NoLocationName = this.submitForm.value.Location;
      req.CountryName = this.submitForm.value.Country;
      req.State = this.submitForm.value.State;
      req.City = this.submitForm.value.City;
      req.HaveAStoreLocation = this.submitForm.value.Availability;
      req.OwnLocation = this.submitForm.value.Ownlocation;
      req.RentLocation = this.submitForm.value.Rentedlocation;

      req.AreainSqftOftheStore = this.submitForm.value.CarpetArea;
      req.Frontage = this.submitForm.value.Frontage;
      req.RetailStoresInSurrounding = this.submitForm.value.Store;
      req.BusinessWebsite = this.submitForm.value.Business;
      req.Comments = this.submitForm.value.Comments;
      req.CaptchaCode = this.submitForm.value.Captcha;

      const formData = new FormData();
      if (this.file1?.length > 0) {
        const blob1 = new Blob(this.file1, { type: 'image/png' });
        formData.append('SnapShot1', blob1, this.file1.name);
      }
      if (this.file2?.length > 0) {
        const blob2 = new Blob(this.file2, { type: 'image/jpg' });
        formData.append('SnapShot2', blob2, this.file2.name);
      }

      if (this.file3?.length > 0) {
        const blob3 = new Blob(this.file3, { type: 'image/gif' });
        formData.append('NearbyStoresSnap', blob3, this.file3.name);
      }

      const data = JSON.stringify(req);
      formData.append('body', data);

      this.franchise
        .postData(finalApi, formData)
        .subscribe((res) => (this.allFields = res));
      this.submitForm.reset();
      this.loginForm.reset();
      this.next = true;
      this.submitted1 = false;
      this.submitted2 = false;
      this.gotoSubmit = false;
    } else {
      this.submitted2 = true;
    }
  }
  getCountries() {
    this.franchise
      .CountryRequest()
      .subscribe((res) => (this.details = res.Data));
  }
  getStates(e: any) {
    this.franchise
      .StateRequest(e.target.value)
      .subscribe((res) => (this.states = res.Data));
  }

  getCities(e: any) {
    const stateName = {
      State: e.target.value,
    };

    this.franchise
      .postCity(cityApi, stateName)
      .subscribe((res) => (this.cities = res.Data));
  }
}
