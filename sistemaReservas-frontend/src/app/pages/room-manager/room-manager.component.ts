import { Component, inject, ViewChild } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Room } from '../../model/room';

import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-room-manager',
  imports: [MaterialModule, RouterLink, RouterOutlet],
  templateUrl: './room-manager.component.html',
  styleUrl: './room-manager.component.css'
})
export class RoomManagerComponent {

  dataSource : MatTableDataSource<Room>;
  rooms : Room[] = [];
  totalElements : number = 0;

  private roomService = inject(RoomService); 
  private _snackBar = inject(MatSnackBar);
  
  @ViewChild(MatSort) matSort : MatSort;
  @ViewChild(MatPaginator) matPaginator : MatPaginator;

  columnsDefinitions =[
     {def:'id', label:'id', hide: true},
     {def:'number', label:'number', hide: false},
     {def:'type', label:'type', hide: false},
     {def:'price', label:'price', hide: false}, 
     {def:'available', label:'available', hide: false}, 
     {def:'actions', label:'actions', hide: false}
  ];

  ngOnInit(){

   // this.roomService.findAll().subscribe(data => { this.createTable(data);  });   

   this.roomService.listPageable(0,2).subscribe(data => {
    this.createTable(data.content);
    this.totalElements = data.totalElements;
   });

    this.roomService.getRoomChange().subscribe(data => this.createTable(data)); 
    this.roomService.getMessageChange().subscribe(message => this._snackBar.open(message, 'INFO', { duration: 2000 }) );

  }

  createTable(data : Room[]){

     this.dataSource = new MatTableDataSource(data);  
        this.dataSource.sort = this.matSort;
   //     this.dataSource.paginator = this.matPaginator;      

  }

  applyFilter(e : any){

    this.dataSource.filter = e.target.value;

  }

  delete(id :number){

    this.roomService.delete(id).pipe(
      switchMap(()=> this.roomService.findAll()),
      tap(data => this.roomService.setRoomChange(data)),
      tap(() => this.roomService.setMessageChange('DELETED! ROOM'))
    )
    .subscribe();
  }

  getDisplayedColumns(){

    return this.columnsDefinitions.filter(cl => !cl.hide).map(cl => cl.def);

  }

   showMore(e: any){
    this.roomService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.createTable(data.content);
      this.totalElements = data.totalElements;
    });
  }




}
