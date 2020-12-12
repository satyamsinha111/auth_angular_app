import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.page.html",
  styleUrls: ["./welcome.page.scss"],
})
export class WelcomePage implements OnInit {
  constructor(private router: Router, private storage: Storage) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.storage.get("token").then((response) => {
      if (response) {
        this.router.navigate(["/home"]);
      }
    });
  }
}
