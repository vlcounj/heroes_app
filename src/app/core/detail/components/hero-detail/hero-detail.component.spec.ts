import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Hero, HeroesService } from 'src/app/shared/services/heroes.service';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  const fakeHeroesService: HeroesService = {
    heroesMock: [
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
    ],
    list: [],
    addHero: function (hero: Hero): void {
      throw new Error('Function not implemented.');
    },
    removeHero: function (hero: Hero): void {
      throw new Error('Function not implemented.');
    },
    getHero: function (id: number): Hero {
      return this.heroesMock.find((value) => value.id === id);
    },
    getTopHeroes: function (count?: number): Hero[] {
      throw new Error('Function not implemented.');
    },
    updateHero: function (hero: Hero): void {
      throw new Error('Function not implemented.');
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: HeroesService, useValue: null }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('existing hero', () => {
    component.heroId = 1;
    component.hero = fakeHeroesService.getHero(component.heroId);
    expect(component.hero.name === 'Atticus').toBeTruthy();
  });

  it('non-existing hero', () => {
    component.heroId = 999;
    component.hero = fakeHeroesService.getHero(component.heroId);
    expect(component.hero === undefined).toBeTruthy();
  });
});
