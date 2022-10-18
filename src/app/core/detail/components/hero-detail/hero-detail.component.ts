import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Hero, HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  heroId: number;
  hero: Hero;

  formG: FormGroup = new FormGroup({
    name: new FormControl([]),
    strength: new FormControl([]),
  });

  formSuccess: boolean = false;

  error: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.heroId = params['id'];
      if (this.heroId) {
        this.hero = this.heroService.getHero(Number(this.heroId)) as Hero;
        if (this.hero) {
          this.formG.get('name')?.setValue(this.hero.name);
          this.formG.get('strength')?.setValue(this.hero.strength);
        } else {
          this.error = true;
        }
      } else {
        this.error = true;
      }
    });
  }

  onSubmit() {
    this.hero.name = this.formG.get('name')?.value;
    this.hero.strength = this.formG.get('strength')?.value;
    this.heroService.updateHero(this.hero);
    this.formSuccess = true;
    setTimeout(() => {
      this.formSuccess = false;
    }, 5000);
  }
}
