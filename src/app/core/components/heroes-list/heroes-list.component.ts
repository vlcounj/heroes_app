import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero, HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class HeroesListComponent implements OnInit {
  heroes: Hero[] = [];

  selectedHero?: Hero;

  constructor(private heroesService: HeroesService, private router: Router) {}

  ngOnInit(): void {
    this.heroes = this.heroesService.list;
  }

  addHero() {
    this.heroesService.addHero({
      id: 1,
      name: 'test 1',
      strength: Math.floor(Math.random() * 99) + 1,
    });
  }

  removeHero() {
    if (this.selectedHero) {
      this.heroesService.removeHero(this.selectedHero);
      this.selectedHero = undefined;
    }
  }

  goToHeroDetail() {
    if (this.selectedHero) {
      this.router.navigate(['/detail', this.selectedHero.id]);
    }
  }
}
