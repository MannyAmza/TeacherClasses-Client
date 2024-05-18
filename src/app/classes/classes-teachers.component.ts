import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';
import {MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Teachers } from './teacher'

@Component({
  selector: 'app-classes-teachers',
  standalone: true,
  imports: [RouterLink, MatTableModule],
  templateUrl: './classes-teachers.component.html',
  styleUrl: './classes-teachers.component.css'
})
export class ClassesTeachersComponent {
  public teachers: Teachers[] = [];
  public displayedColumns: string[] = [ 
    "professorId",
    "professorName",
    "courseNum",
    "days",
    "time",
    "location"
  ];
  id: number;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute){
    this.id = -1;
  }

    ngOnInit(){
      this.getCourses();
    }

  getCourses() {
    let idparameter = this.activatedRoute.snapshot.paramMap.get("id");
    this.id = idparameter ? + idparameter : 0;

    this.http.get<Teachers[]>(`${environment.baseUrl}api/classes/classCourses/${this.id}`).subscribe(
      {
        next: result => this.teachers = result,
        error: error => console.log(error)
      }
    );
  }
}
