import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  SuperHero,
  Company,
} from '../../../shared/interfaces/super-hero.interface';
import { UiService } from '../../../services/ui.service';
import { SuperHerosService } from '../../../services/super-heros.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [],
})
export class AddComponent implements OnInit {
  form: UntypedFormGroup;

  edit: boolean = false;

  superHero: SuperHero = {
    name: '',
    company: Company.Marvel,
    info: '',
    img: '',
  };

  companias = [
    {
      id: 'Marvel',
      text: 'Marvel',
    },
    {
      id: 'DC',
      text: 'DC',
    },
  ];

  constructor(
    private superHerosService: SuperHerosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private uiService: UiService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      info: ['', [Validators.required]],
      img: ['', [Validators.required]],
    });

    if (!this.router.url.includes('edit')) {
      this.edit = true;
      return;
    }

    const id = this.activatedRoute.snapshot.params['id'];

    this.superHerosService.getSuperHeroById(id).subscribe((superHero) => {
      this.superHero = superHero;

      this.edit = true;

      this.form.controls['name'].setValue(superHero.name);
      this.form.controls['company'].setValue(superHero.company);
      this.form.controls['info'].setValue(superHero.info);
      this.form.controls['img'].setValue(superHero.img);
    });
  }

  guardar() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.superHero.name = this.form.controls['name'].value;
    this.superHero.company = this.form.controls['company'].value;
    this.superHero.info = this.form.controls['info'].value;
    this.superHero.img = this.form.controls['img'].value;

    if (this.superHero.id) {
      this.superHerosService
        .editSuperHero(this.superHero)
        .subscribe((superHero) => {
          this.uiService.showSnackBar('Super Héroe actualizado exitosamente');
          this.superHero = superHero;
          this.router.navigate(['/']);
        });
    } else {
      this.superHerosService
        .addSuperHero(this.superHero)
        .subscribe((superHero) => {
          this.uiService.showSnackBar('Super Héroe guardado exitosamente');
          this.superHero = superHero;
          this.router.navigate(['/']);
        });
    }
  }
}
