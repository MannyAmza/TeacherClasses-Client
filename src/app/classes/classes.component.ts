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
    this.getClasses();
  }

  //Sorted the classes in numerical order
  //Also made the class name format better, to deal with classes displaying as all capitalized
  getClasses() {
    this.http.get<Classes[]>(environment.baseUrl + 'api/Classes').subscribe(
      {
        next: result => {
          this.classes = result;
          this.sortClasses();
          this.formatClassNames();
        },
        error: error => console.error(error)
      }
    );
  }

  //Sorted the classes in numerical order
  sortClasses() {
    this.classes.sort((a, b) => {
      const numA = this.extractNumber(a.cnum);
      const numB = this.extractNumber(b.cnum);
      return numA - numB;
    });
  }

  //Extracts the number from a string
  extractNumber(str: string): number {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  //Makes the class name title case
  formatClassNames() {
    this.classes.forEach(c => {
      c.cname = this.toTitleCase(c.cname);
    });
  }

  //Makes the class name title case
  toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
  }
}