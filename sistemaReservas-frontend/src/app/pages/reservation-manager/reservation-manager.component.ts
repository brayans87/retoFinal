import { Component, inject, ViewChild } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from '../../model/reservation';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReservationManagerEditComponent } from './reservation-manager-edit/reservation-manager-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, take, tap } from 'rxjs';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-reservation-manager',
  imports: [MaterialModule, RouterOutlet, MatDialogModule],
  templateUrl: './reservation-manager.component.html',
  styleUrl: './reservation-manager.component.css'
})
export class ReservationManagerComponent {

  private reservationService = inject(ReservationService);
  private roomService = inject(RoomService);

  private _dialog = inject(MatDialog);
  private _snackbar = inject(MatSnackBar);

  dataSource: MatTableDataSource<Reservation>;

  totalElements: number = 0;


  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;

  columnsDefinitions = [
    { def: 'id', label: 'id', hide: true },
    { def: 'customerName', label: 'customerName', hide: false },
    { def: 'checkInDate', label: 'checkInDate', hide: false },
    { def: 'checkOutDate', label: 'checkOutDate', hide: false },
    { def: 'numberRoom', label: 'numberRoom', hide: false },
    { def: 'actions', label: 'actions', hide: false },
  ];

  ngOnInit(): void {

    //   this.reservationService.findAll().subscribe(data => { this.createTable(data); });

    this.reservationService.listPageable(0, 2).subscribe(data => {
      this.createTable(data.content);
      this.totalElements = data.totalElements;
    });

    this.reservationService.getReservationChange().subscribe(data => this.createTable(data));
    this.reservationService.getMessageChange().subscribe(message => this._snackbar.open(message, 'INFO', { duration: 2000 }));

  }

  createTable(data: Reservation[]) {

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.matSort;
   // this.dataSource.paginator = this.matPaginator;

  }

  applyFilter(e: any) {

    this.dataSource.filter = e.target.value;

  }

  delete(id: number) {

    this.reservationService.delete(id).pipe(
      switchMap(() => this.reservationService.findAll()),
      tap(data => this.reservationService.setReservationChange(data)),
      tap(() => this.reservationService.setMessageChange('DELETED')),
      switchMap(() => this.roomService.findByAvailable()),
      tap(data => this.reservationService.setRoomChange(data))

    )
      .subscribe();
  }

  getDisplayedColumns() {
    return this.columnsDefinitions.filter(cl => !cl.hide).map(cl => cl.def);
  }

  openDialog(reservation?: Reservation) {

    this._dialog.open(ReservationManagerEditComponent, {
      width: '850px',
      height: '400px',
      data: reservation,
      disableClose: true

    });

  }

  showMore(e: any) {
    this.reservationService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.createTable(data.content);
      this.totalElements = data.totalElements;
    });
  }




}
