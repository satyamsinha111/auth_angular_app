import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiCallsService } from "../service/api-calls.service";
import { Storage } from "@ionic/storage";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  email: string = null;
  password: string = null;
  message: string = null;
  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(
    private router: Router,
    private apiCallsService: ApiCallsService,
    public toastController: ToastController,
    private storage: Storage
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.storage.get("token").then((response) => {
      console.log(response);
      if (response) {
        this.router.navigate(["/home"]);
      }
    });
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  Back() {
    this.router.navigate(["/welcome"]);
  }

  Reset() {
    this.message = null;
    this.email = null;
    this.password = null;
  }

  Login() {
    if (!this.email) {
      console.log("Please enter the email");
      this.presentToast("Please enter the email");
      return;
    }
    if (!this.password) {
      console.log("Please enter the password");
      this.presentToast("Please enter the password");
      return;
    }
    if (!this.re.test(this.email)) {
      console.log("Email is not in correct format");
      this.presentToast("Email format is not correct");
      return;
    }
    this.apiCallsService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe(
        (response) => {
          console.log("Auth response", response["token"]);
          this.storage.set("token", response["token"]);
          this.message = "Logged in successfully";
          this.presentToast("Logged in successfully");
          this.Reset();
          this.router.navigate(["/home"]);
        },
        async (error) => {
          console.log("Error occured", error.error.error);
          this.message = error.error.error;
          this.presentToast(this.message);
          this.Reset();
        }
      );
  }
}
