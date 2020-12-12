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
  page = 1;
  total_page: Number = null;

  public doctors = [];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDoctorsByPage(this.page);
  }
  ngAfterViewInit() {
    this.storage.get("token").then((response) => {
      console.log(response);
      if (!response) {
        this.router.navigate(["/welcome"]);
      }
    });
  }
  getDoctorsByPage(page: Number) {
    this.api_calls.getDoctors(page).subscribe((doctors) => {
      console.log("console.log total pages", doctors.total_pages);
      this.total_page = doctors.total_pages;
      this.doctors = [...doctors.data];
    });
    console.log("Called");
  }
  Logout() {
    this.storage.remove("token").then((response) => {
      console.log(response);
      this.router.navigate(["/"]);
    });
  }

  loadData(event) {
    console.log(event);
    this.page++;
    this.api_calls.getDoctors(this.page).subscribe((doctors) => {
      console.log("console.log total pages", doctors.total_pages);
      this.total_page = doctors.total_pages;
      doctors.data.map((doctor, index) => {
        this.doctors.push(doctor);
      });
      event.target.complete();
    });
  }
}
