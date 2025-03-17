import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators,FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { finalize } from 'rxjs';
import { IPerson } from '../../interfaces/person.interface';

const PROVIDERS = [
  PersonService
];
const MODULES = [
  FormsModule,
  ReactiveFormsModule
];

@Component({
  selector: 'app-person',
  imports: [MODULES],
  providers: [PROVIDERS],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent implements OnInit{

  readonly form: FormGroup;
  readonly #personaService = inject(PersonService);
  readonly persona = signal<IPerson | null>(null);
  submitted = false;
  
  constructor(){
    this.form = new FormGroup({
      tipoDocumento: new FormControl<string | null>("",[Validators.required]),
      numeroDocumento: new FormControl<string | null>(null,[Validators.pattern('^[0-9]*$'), Validators.required, Validators.maxLength(8), Validators.minLength(8)])
    });
  }

  ngOnInit(): void {

  }

  getPersonByNumeroDocumento(){

    this.submitted = true;
    if (!this.form.valid) {
      this.form.markAsTouched()
      this.form.errors;
      return;
    }
    const nroDocumento = this.form.get('numeroDocumento')?.value;
    if(nroDocumento){
      this.#personaService.getPersonByNumeroDocumento(nroDocumento).pipe(
        finalize(() => {{}})
      ).subscribe({
        next: (data) => {
          console.log(data);
          this.persona.set(data);
        }
      });
    }
  }
}
