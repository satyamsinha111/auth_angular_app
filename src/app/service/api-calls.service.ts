import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ApiCallsService {
  base_url = "https://reqres.in/api/";
  constructor(private http: HttpClient) {}

  getDoctors(page: Number): Observable<any> {
    console.log("hello");
    return this.http.get(`${this.base_url}users?page=${page}`).pipe(
      map((results) => {
        console.log("Doctors are", results);
        return results;
      })
    );
  }

  login(data) {
    return this.http.post(`${this.base_url}login`, data).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
