import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/models/event';


@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent {
  



constructor(private rs: EventService) { }


listEvents: any[] = [];

filteredEvents: any[] = []; // Liste filtrée
searchTerm: string = ''; // Terme de recherche
ngOnInit() {
  this.rs.getEvent().subscribe((data) => {
    console.log("Données récupérées :", data); // Debugging
    this.listEvents = data;
    this.filteredEvents = data; // Copie pour le filtrage
  }, (error) => {
    console.error("Erreur lors de la récupération des événements :", error);
  });
}

  

  supp(id: number) {
    // Trouver l'événement correspondant dans la liste
    const eventToDelete = this.listEvents.find(event => event.id === id);
  
    // Vérifier si l'événement est disponible
    if (eventToDelete && eventToDelete.disponible) {
      alert("Vous ne pouvez supprimer que les événements non disponibles.");
      return; 
    }
  
    // Si l'événement est non disponible, le supprimer
    this.rs.deleteEvent(id).subscribe(
      () => this.ngOnInit()
    );
  }
  // Fonction de filtrage
  filterEvents() {
    this.filteredEvents = this.listEvents.filter(event =>
      event.lieu.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      event.date.includes(this.searchTerm)
    );
  }
  totalDisponibles: number | null = null;


  getTotalDisponibles(): number {
    return this.listEvents.filter(event => event.disponible).length;
  }
  
}
