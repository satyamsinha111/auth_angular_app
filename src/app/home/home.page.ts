import { Component } from "@angular/core";
import { ApiCallsService } from "../service/api-calls.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(
    private api_calls: ApiCallsService,
    private router: Router,
    private storage: Storage
  ) {}
  page: Number = 1;
  total_page: Number = null;
  next_disabled: Boolean = false;
  //Adding demo data for removing warnings
  public doctors = [
    {
      avatar: null,
      first_name: null,
      last_name: null,
      email: null,
    },
  ];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDoctorsByPage(this.page);
  }
  ngAfterViewInit() {
    if (!this.storage.get("token")) {
      this.router.navigate(["/login"]);
    }
  }
  prevPage() {
    console.log(this.page);
    if (this.page <= this.total_page || this.page > 0) {
      console.log("hello", this.page);
      this.page = +this.page - 1;
      this.api_calls.getDoctors(this.page).subscribe((doctors) => {
        this.doctors = [...doctors.data];
      });
    }
  }

  getDoctorsByPage(page: Number) {
    if (this.total_page) {
      if (this.page > this.total_page) {
        this.next_disabled = true;
        return;
      }
    }
    this.api_calls.getDoctors(page).subscribe((doctors) => {
      console.log(doctors.total_pages);
      this.total_page = doctors.total_pages;
      this.doctors = [...doctors.data];
      if (this.page <= this.total_page) {
        this.page = +this.page + 1;
      }
    });
    console.log("Called");
  }
  Logout() {
    this.storage.remove("token").then((response) => {
      console.log(response);
      this.router.navigate(["/"]);
    });
  }
}
