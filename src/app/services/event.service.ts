import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }


  getEvent():Observable<Event[]>{
    return this.http.get<Event[]>("http://localhost:3000/event")
  }
  getEventById(id:number):Observable<Event>{
    return this.http.get<Event>("http://localhost:3000/event/"+id)
  }
  addEvent(Event: Event): Observable<Event>{
    return this.http.post<Event>("http://localhost:3000/event/", Event)
  }

  deleteEvent(id:number):Observable<Event>{
    return this.http.delete<Event>("http://localhost:3000/event/"+id)
  }

  updateEvent(Event:Event, id:number):Observable<Event>{
    return this.http.put<Event>("http://localhost:3000/event/"+id, Event)
  }
}
