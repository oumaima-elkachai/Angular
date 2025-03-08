import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  eventForm: FormGroup;
  id!:number
  Event!:Event
  
  constructor(private es :EventService,private route:Router,private act:ActivatedRoute) {
    // Initialisation du formulaire avec FormGroup et FormControl
      this.eventForm = new FormGroup({
        titre: new FormControl('', [Validators.required, Validators.minLength(4)]),
        description: new FormControl('', [Validators.required, Validators.minLength(10)]),
        lieu: new FormControl('', [Validators.required]),
        date: new FormControl('', Validators.required),
        disponible: new FormControl(false),
        nbrMax:new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
      });
  }

  
  save() {
    if (this.eventForm.invalid) return; // Vérification des erreurs
  
    if (this.id) { // Si un ID existe, c'est une modification
      this.es.updateEvent(this.eventForm.value, this.id).subscribe(() => {
        console.log("Événement mis à jour !");
        this.route.navigateByUrl('/event'); // Redirection après update
      });
    } else { // Sinon, c'est un ajout
      this.es.addEvent(this.eventForm.value).subscribe(() => {
        console.log("Événement ajouté !");
        this.route.navigateByUrl('/event'); // Redirection après ajout
      });
    }
  }
  

  ngOnInit() {
    this.id = this.act.snapshot.params['id']; // Récupérer l'ID depuis l'URL
  
    if (this.id) { // Si un ID est présent, il s'agit d'une modification
      this.es.getEventById(this.id).subscribe(
        (data) => {
          console.log("Données récupérées pour l'update :", data);
          this.eventForm.patchValue(data); // Remplit le formulaire avec les valeurs précédentes
        },
        (error) => console.error("Erreur lors de la récupération des données :", error)
      );
    }
  }
  

    

}
