import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginatorComponent } from './components/paginator/paginator.component';




const routes: Routes = [
  {
    path: '',
    redirectTo: '/clientes',
    pathMatch: 'full',
  },
  {
    path: 'directivas',
    component: DirectivaComponent,
  },
  {
    path: 'clientes',
    component: ClientesComponent,
  },
  {
    path: 'clientes/page/:page',
    component: ClientesComponent,
  },
  {
    path: 'clientes/form',
    component: FormComponent,
  },
  {
    path: 'clientes/form/:id',
    component: FormComponent,
  },
]

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    DirectivaComponent,
    FooterComponent,
    FormComponent,
    HeaderComponent,
    PaginatorComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
