import { Component, ElementRef, enableProdMode, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { EditProfileService } from '../service/edit-profile.service';
import { Storage } from '@ionic/storage';
import { RegisterService } from '../service/register.service';
import { Md5 } from 'md5-typescript';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Capacitor } from '@capacitor/core';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('filePicker', {static: false}) filePickerRef: ElementRef<HTMLInputElement>;
  photo : SafeResourceUrl;
  isDesktop: boolean;
  username: string;
  fullname : string;
  userId: string;
  // @Input() usernameText: string;
  @Input() passwordText: string;
  @Input() nameText: string;
  errorText: string = "";
  
  constructor(
    // private cameraPreview: CameraPreview,
    public storage : Storage, 
    public registerSrv: RegisterService, 
    private route : Router,
    private platform  : Platform,
    private sanitizer : DomSanitizer,
    public toastController: ToastController) 
    { }

  ngOnInit() {
    if((this.platform.is('mobile')&& this.platform.is('hybrid')) || this.platform.is('desktop')){
      this.isDesktop = true;
    }
  }

  ionViewWillEnter(){
    this.storage.get('image').then((parameter) => {
      this.photo = parameter;
      console.log(parameter);
    })
    this.storage.get('nama').then((parameter) => {
      this.nameText = parameter;
      // console.log(parameter);
    })
    this.storage.get('username').then((parameter) => {
      this.username = parameter;
      // console.log(parameter);
    })
    this.passwordText = "";
  }

  

  simpanProfile(){
    if (!this.nameText) {
      this.errorToast();
      // this.errorText = "Mohon isi semua field";
      return;
    }
    else{
      const user ={
        image    : this.photo.changingThisBreaksApplicationSecurity,
        nama     : this.nameText,
        username : this.username,
        newPassword : Md5.init(this.passwordText),
      };
      console.log(user);
      this.registerSrv.editProfile(user).subscribe(async res=>{
        console.log(res);
        await this.storage.set('image',res.profile.image);
        await this.storage.set('nama',res.profile.nama);
        this.presentToast();
      })
    }
    
  }
  
  toLogout(){
    this.route.navigateByUrl('/register');
  }

  async changePicture(type:string) {
    if(!Capacitor.isPluginAvailable('Camera') || (this.isDesktop && type ==='gallery')){
      this.filePickerRef.nativeElement.click();
      return;
    }

    const image = await Camera.getPhoto({
      quality : 100,
      width : 400,
      allowEditing  : false,
      resultType  : CameraResultType.DataUrl,
      source :CameraSource.Prompt
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    console.log(this.photo);
  }

  onFileChoose(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if(!file.type.match(pattern)){
      console.log('File format not supported');
      return;
    }

    reader.onload = () => {
      this.photo = reader.result.toString()
      
    };
    reader.readAsDataURL(file);
  }
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Berhasil tersimpan',
      color: 'success',
      position: 'bottom',
      duration: 1500
    });
    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Mohon isi kolom nama untuk menyimpan',
      color: 'danger',
      position: 'bottom',
      duration: 1500
    });
    toast.present();
  }
}

