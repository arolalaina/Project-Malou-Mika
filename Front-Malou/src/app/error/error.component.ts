import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  message = "An error occured !"

  constructor(
    private data: DataService,
    private titleService: Title,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.data.changeTitle("Error")
    this.titleService.setTitle("Error")
  }

  //Ceci pour rediriger l'utilisateur en cas d'erreur d'url
  handleBack(){
    this.router.navigate(['home']);
  }



}
