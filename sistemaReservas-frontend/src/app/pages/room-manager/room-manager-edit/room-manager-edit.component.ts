
import { MaterialModule } from '../../../material/material.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Room } from '../../../model/room';

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { RoomService } from '../../../services/room.service';
import { switchMap, tap } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-manager-edit',
  imports: [CommonModule, MatDialogModule, MaterialModule, ReactiveFormsModule, RouterLink, MatCheckboxModule, MatRadioModule],
  templateUrl: './room-manager-edit.component.html',
  styleUrl: './room-manager-edit.component.css'
})
export class RoomManagerEditComponent {

  form: FormGroup;
  id: number;
  isEdit: boolean;
  submitted = false;

  route = inject(ActivatedRoute);
  roomService = inject(RoomService);
  router = inject(Router);

  ngOnInit(): void {

    this.form = new FormGroup({

      id: new FormControl(),
      number: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      available: new FormControl('', Validators.required)

    });

    this.route.params.subscribe(data => {

      this.id = data['id'];
      this.isEdit = data['id'] != null;

      this.initForm();

    });

  }

  initForm() {

    if (this.isEdit) {

      this.roomService.findById(this.id).subscribe(data => {

        this.form = new FormGroup({

          id: new FormControl({ value: data.id, disabled: true }),
          number: new FormControl({ value: data.number, disabled: true }),
          type: new FormControl({ value: data.type, disabled: true }),
          price: new FormControl({ value: data.price, disabled: true }),
          available: new FormControl(data.available, Validators.required)

        });
      });

    }

  }


  operate() {

   
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const room: Room = new Room();

    room.id = this.form.value['id'];
    room.number = this.form.value['number'];
    room.type = this.form.value['type'];
    room.price = this.form.value['price'];
    room.available = this.form.value['available'];

 

   if(this.isEdit){

    this.roomService.update(this.id, room).pipe(
      switchMap(() => this.roomService.findAll()),
      tap(data => this.roomService.setRoomChange(data)),
      tap(() => this.roomService.setMessageChange('UPDATE!'))
    ).subscribe();

   }else{

    this.roomService.save(room).pipe(
      switchMap(() => this.roomService.findAll()),
      tap(data => this.roomService.setRoomChange(data)),
      tap(() => this.roomService.setMessageChange('SAVED!'))
    ).subscribe();

   }
    
   this.router.navigate(['/pages/room']);
   

  
  
  }

  get f() {
    return this.form.controls;
  }

}
