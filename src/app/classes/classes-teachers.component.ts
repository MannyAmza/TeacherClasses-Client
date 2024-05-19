import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Teachers } from './teacher'
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-classes-teachers',
  standalone: true,
  imports: [RouterLink, MatTableModule],
  templateUrl: './classes-teachers.component.html',
  styleUrls: ['./classes-teachers.component.css']
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
  public filteredTeachers: Teachers[] = [];
  public isInPerson: boolean = true;
  public isWeekday: boolean = true;
  id: number;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    this.id = -1;
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.getCourses();
    } else {
      this.router.navigate(['/login']);
    }
  }

  //got duplicate courses showing with different ids. Finds courses with similar course number 
  //and chooses to show the one with the lowest ID number
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
          this.filterCourses();
        },
        error: error => console.log(error)
      }
    );
  }

  filterCourses() {
    this.filteredTeachers = this.teachers;

    if (this.isInPerson !== null) {
      this.filteredTeachers = this.filteredTeachers.filter(course => {
        return this.isInPerson ? course.location.toLowerCase() !== 'online' : course.location.toLowerCase() === 'online';
      });
    }

    if (this.isWeekday !== null) {
      this.filteredTeachers = this.filteredTeachers.filter(course => {
        const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr'];
        const courseDays = course.days.split(', ').flatMap(day => day.split(/(?=[A-Z])/));
        const weekdayDays = courseDays.filter(day => daysOfWeek.includes(day));
        const weekendDays = courseDays.filter(day => !daysOfWeek.includes(day));
        return this.isWeekday ? weekdayDays.length > 0 : weekendDays.length > 0;
      });
    }
  }

  toggleInPersonFilter(value: boolean) {
    this.isInPerson = value;
    this.filterCourses();
  }

  toggleWeekdayFilter(value: boolean) {
    this.isWeekday = value;
    this.filterCourses();
  }
}