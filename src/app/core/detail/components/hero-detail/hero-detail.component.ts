import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero, HeroesService } from 'src/app/core/services/heroes.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  heroId: number;
  hero: Hero;
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
        if (!this.hero) {
          this.error = true;
        }
      } else {
        this.error = true;
      }
    });
  }
}
