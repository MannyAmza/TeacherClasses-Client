import { Component } from '@angular/core';
import { Classes } from './classes';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {
  public classes: Classes[] = [];
  //serverurlswaggerui
 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCountries();
  }
  getCountries() {
    this.http.get<Classes[]>(environment.baseUrl +'api/Classes').subscribe(
      {
        next: result => this.classes = result, 
        error: error => console.error(error)
      }
    );
  }
}