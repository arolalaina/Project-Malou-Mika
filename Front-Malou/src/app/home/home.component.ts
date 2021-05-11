import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(  
  private data: DataService,
  private titleService: Title,
  private router: Router) { }

  ngOnInit(): void {
    this.data.changeTitle("Product Hunt - Mika")
    this.titleService.setTitle("Product Hunt - Mika")
  }
  
  //Rediriger l'utilisateur vers la page principale
  redirection(){
    this.router.navigate(['/list']).then(() => {
      window.location.reload();
    });
  }

}
