import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';
import {MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Teachers } from './teacher'
import { AuthService } from '../auth/auth.service';

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
    "courseNum",
    "professorName",
    "days",
    "time",
    "location"
  ];
  id: number;

  constructor(
    private http: HttpClient, 
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private authService: AuthService){
    this.id = -1;
  }

  //Instead of displaying nothing, It will instead route them to login
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.getCourses();
    } else {
      this.router.navigate(['/login']);
    }
  }

  //Displayed multiple courses as duplicates with different IDs
  //Made it so that if the Course number is equal to one another, it chooses to 
  //display the course with the lowest ID only
  getCourses() {
    let idparameter = this.activatedRoute.snapshot.paramMap.get("id");
    this.id = idparameter ? +idparameter : 0;
  
    this.http.get<Teachers[]>(`${environment.baseUrl}api/classes/classCourses/${this.id}`).subscribe(
      {
        next: result => {
          this.teachers = result.reduce((acc: Teachers[], curr: Teachers) => {
            const existingTeacher = acc.find((t: Teachers) => t.courseNum === curr.courseNum);
            if (existingTeacher && existingTeacher.professorId > curr.professorId) {
              acc[acc.indexOf(existingTeacher)] = curr;
            } else if (!existingTeacher) {
              acc.push(curr);
            }
            return acc;
          }, []);
        },
        error: error => console.log(error)
      }
    );
  }
}
