import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNgxMask(),
  ],
  templateUrl: './forms-register.component.html',
  styleUrl: './forms-register.component.css'
})
export class FormsRegisterComponent {

  userForm = new FormGroup({
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
    cep: new FormControl('', [Validators.required])
  })
}
