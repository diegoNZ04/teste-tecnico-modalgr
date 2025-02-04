import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CepService } from '../../services/cep.service';
import { UserModel } from '../../models/user';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-forms-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    NgxMaskDirective,
    MatTableModule,
    MatPaginatorModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNgxMask(),
  ],
  templateUrl: './forms-register.component.html',
  styleUrl: './forms-register.component.css'
})
export class FormsRegisterComponent {

  address: any = null;

  userForm: FormGroup;

  users: UserModel[] = [];

  displayedColumns: string[] = ['Nome', 'Email', 'Idade', 'CEP', 'Logradouro', 'Bairro', 'Localidade', 'Estado'];

  constructor(private fb: FormBuilder, private cepService: CepService) {
    this.userForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)
      ]),
      cpf: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(200)
      ]),
      cep: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)])
    });
  }

  today: Date = new Date();
  limitedDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() - 150));

  calculateAge(birthDate: string): number {
    const today = new Date();
    const born = new Date(birthDate);
    let age = today.getFullYear() - born.getFullYear();
    const monthActual = today.getMonth();
    const montBorn = born.getMonth();

    if (monthActual < montBorn || (monthActual === montBorn && today.getDate() < born.getDate())) {
      age--;
    }

    return age;
  }

  getCep() {
    const cep = this.userForm.get('cep')?.value;
    if (cep?.length === 8) {
      this.cepService.getCep(cep).subscribe((data) => {
        this.address = {
          cep: data.cep,
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          estado: data.estado
        };
        console.log('Endereço encontrado: ', this.address)
      })
    }
  }

  saveUser() {
    if (this.userForm.valid && this.address) {
      const birthDate = this.userForm.get('birthDate')?.value;
      const age = this.calculateAge(birthDate);

      const user = {
        nome: this.userForm.get('name')?.value,
        email: this.userForm.get('email')?.value,
        idade: age,
        cep: this.userForm.get('cep')?.value,
        ...this.address
      };

      this.users.push(user);
      this.userForm.reset();
      this.address = null;
    }
  }

}
