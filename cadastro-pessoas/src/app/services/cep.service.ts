import { Injectable } from "@angular/core";
import { CepType } from "../types/cep.type";
import { HttpClient } from "@angular/common/http";
import { response } from "express";
import { map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CepService {
  cepResponse: CepType = {
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    estado: ''
  }
  constructor(private readonly httpClient: HttpClient) { }

  getCep(cep: string) {
    return this.httpClient
      .get<CepType>(`https://viacep.com.br/ws/${cep}/json`)
      .pipe(
        map((response) => {
          this.cepResponse = response;
          return this.cepResponse;
        })
      );
  }
}
