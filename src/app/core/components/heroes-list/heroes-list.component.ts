import { Component, Inject, Injectable, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Hero, HeroesService } from '../../../shared/services/heroes.service';

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

  newHero: Hero = { id: -1, name: '', strength: undefined };

  selectedHero?: Hero;

  strongHighlight: string = 'a';

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.heroes = this.heroesService.list;
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.newHero.name, strength: this.newHero.strength },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newHero.name = result.name.trim();
        this.newHero.strength = result.strength;
        this.heroesService.addHero(this.newHero);
        // unset atributu
        this.newHero = { id: -1, name: '', strength: undefined };
      }
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>New Hero</h1>
    <div mat-dialog-content>
      <p>Fill in the name and the strength of a new hero.</p>
      <mat-form-field appearance="fill">
        <mat-label>Name</mat-label>
        <input matInput cdkFocusInitial [(ngModel)]="data.name" />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Strength</mat-label>
        <input
          matInput
          type="number"
          min="0"
          max="100"
          [(ngModel)]="data.strength"
        />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button
        mat-button
        [mat-dialog-close]="data"
        [disabled]="
          data.strength === undefined ||
          data.strength === null ||
          data.name.trim() === '' ||
          data.strength < 0 ||
          data.strength > 100
        "
        class="btn btn-primary text-white"
      >
        Add hero
      </button>
    </div>
  `,
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Hero
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
