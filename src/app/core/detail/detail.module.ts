import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { DetailRoutingModule } from './detail-routing.module';

@NgModule({
  declarations: [HeroDetailComponent],
  imports: [
    DetailRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DetailModule {}
