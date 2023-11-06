import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../backend.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  displayedColumns: string[] = ['position','date','name','persona', 'role', 'screen_mode', 'actions' ];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  dataSource = new MatTableDataSource([]);

  data = []
  constructor(
    private service : BackendService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.service.getData('candidate/candidate_save/').subscribe((response) => {
      this.data = response['data']
      this.dataSource = new MatTableDataSource(response['data']);
      this.dataSource.paginator = this.paginator;
    })
  }
  deleteRecord(id : string) {
    let dctData = {
      id : id
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
      this.service.deleteData('candidate/candidate_save/?id='+id).subscribe((response) => {
        this.data = response['data']
        this.dataSource = new MatTableDataSource(response['data']);
        this.dataSource.paginator = this.paginator;
        this.getData()
      })
    }
    })


  }
  editRecord(id: string) {
    let promise = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        localStorage.setItem('candidateId', id);
        resolve(); 
      }); 
    });
    
    promise.then(() => {
      this.router.navigateByUrl('edit');
    }).catch((error) => {
    });
  }
  addData(){
    this.router.navigateByUrl('add')
  }
}
