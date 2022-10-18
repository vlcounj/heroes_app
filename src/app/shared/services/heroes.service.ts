import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  heroesMock: Hero[] = [
    { id: 1, name: 'Atticus', strength: 8 },
    { id: 2, name: 'Beautiful-Maggot', strength: 70 },
    { id: 3, name: 'Doctor Magnificent', strength: 47 },
    { id: 4, name: 'Amelia', strength: 75 },
    { id: 5, name: 'Miles', strength: 42 },
    { id: 6, name: 'Captain Fairman', strength: 74 },
    { id: 7, name: 'Agent Wonderful', strength: 42 },
    { id: 8, name: 'Scarlett', strength: 88 },
    { id: 9, name: 'Professor Clean', strength: 49 },
    { id: 10, name: 'Zlaticabob', strength: 50 },
    // { id: 11, name: 'Malcolm', strength: 93 },
    // { id: 12, name: 'Harper', strength: 36 },
    // { id: 13, name: 'Brooks', strength: 47 },
    // { id: 14, name: 'Emmeline', strength: 28 },
    // { id: 15, name: 'Harlow', strength: 98 },
    // { id: 16, name: 'Ida', strength: 25 },
    // { id: 17, name: 'Diana', strength: 53 },
    // { id: 18, name: 'Holden', strength: 3 },
    // { id: 19, name: 'Tallulah', strength: 42 },
    // { id: 20, name: 'Lincoln', strength: 43 },
  ];

  constructor() {}

  get list() {
    return this.heroesMock;
  }

  addHero(hero: Hero) {
    const exists = this.heroesMock.find((value) => value.id === hero.id);

    if (exists || hero.id === null || hero.id === -1) {
      hero.id = Math.max(...this.heroesMock.map((o) => o.id)) + 1;
    }
    this.heroesMock.push(hero);
  }

  removeHero(hero: Hero) {
    const index = this.heroesMock.indexOf(hero);
    if (index !== -1) {
      this.heroesMock.splice(index, 1);
    }
  }

  getHero(id: number) {
    return this.heroesMock.find((value) => value.id === id);
  }

  getTopHeroes(count: number = 4) {
    if (count > this.heroesMock.length) {
      count = this.heroesMock.length;
    }

    // duplikace, protoze sort zmeni dane pole a pote ho vrati, necheme menit puvodni
    const dupArr = [...this.heroesMock];
    const sortedArr = dupArr.sort((a, b) => b.strength - a.strength);

    return sortedArr.slice(0, count);
  }

  updateHero(hero: Hero) {
    const index = this.heroesMock.findIndex((value) => value.id === hero.id);
    if (index !== -1) {
      this.heroesMock[index] = hero;
    }
  }
}

export interface Hero {
  id: number;
  name: string;
  strength: number;
}
