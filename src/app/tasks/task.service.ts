import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


import { Task } from './task';
import { TASKS } from './task-list/mock-tasks';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = "http://localhost:3000/tasks/";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get(this.url)
      .pipe(map((response: any) => {
        const tasks = [];
        for (let i = 0; i < response.doc.length; i++) {
          tasks.push(Task.parse(response.doc[i]));
        }
        return tasks;
    }), catchError(this.handleError('getTasks', [] )));

  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task).pipe(
      tap((_task: Task) => console.log(`added hero w/ id=${_task._id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  updateTask(task: Task, id: string): Observable<Task> {
    const url = `${this.url}/${id}`;

    return this.http.put<Task>(url, task).pipe(
      tap(_ => console.log(`updated hero id=${id}`)),
      catchError(this.handleError<Task>('updateTask'))
    );
  }

  /** DELETE: delete the task from the server */
  removeTask (id: string): Observable<Task> {

    const url = `${this.url}/${id}`;

    return this.http.delete<Task>(url).pipe(
      tap(_ => console.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead
      console.error("connection error");
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
