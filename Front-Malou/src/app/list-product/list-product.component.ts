import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { DataService } from '../service/data.service';
import {ProductService} from '../service/product.service'
import {formatDate} from '@angular/common';
import { ToastrService } from 'ngx-toastr';

export interface ProductData {
  name: string;
  product_state: string;
  tagline: string;
  day: Date;
}

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'product_state', 'tagline', 'day'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
    }
  criteria_date : any
  dataSets : any
  dataReady = false;

  //DataService et titleService  pour le changement du titre,
  //toast pour les petits pop-up
  //ProductService pour le call des webservices vers NodeJs
  constructor( private data: DataService,
    private titleService: Title,
    private toastr: ToastrService,
    private productService : ProductService) {}

  ngOnInit(): void {
    //Changer le titre avec l'aide d'un service dans le dataService
    this.data.changeTitle("List product");
    this.titleService.setTitle("List product");    
  }

  //Fonction pour apperler le product service pour les données
  async searching(current_date) {  
    await this.productService.getPostsByDate(current_date);
    this.dataSets =  this.productService.actuals_posts.posts
   }

   //Fonction principale lors du déclenche de la recherche
  async search_via_date(){
    let current_date = this.criteria_date    
    if(current_date == null){
      this.toastr.warning('Valeur vide', 'Veuillez choisir une date', {
        timeOut: 2000,
      });
    } else {
      let val = formatDate(current_date,'yyyy-MM-dd','en');
      this.toastr.info('Recherche en cours', 'Veuillez attendre', {
        timeOut: 2000,
      });
     await this.searching(val);
    
    //Trier et regrouper les valeurs pour l'affichage dans le pie chart
    this.productService.sortWithTopic();
   //Changer l'état en true pour marquer l'arrivée des données pour le chart et le table
    this.dataReady = true;
    //Affecter les dataSets des posts del'api en tant que DataSource pour le tableau qu'on va afficher
    this.dataSource = new MatTableDataSource(this.dataSets);
    //Appel de la fonction pour mettre en place la pagination et le tri a chaque nouvelle set de données
    this.setDataSourceAttributes()
    //Affectation des valeurs regrouper par topic pour le Pie Chart
    this.pieChartLabels = this.productService.list_topics;
    this.pieChartData = this.productService.posts_count_per_topics;
    this.pieChartType = 'pie';
    }
  }

  //Pie chart initialisation
  public pieChartLabels:string[] ;
  public pieChartData:number[] ;
  public pieChartType:string;
 
  //Poursuivre les evenements sur le Pie chart dans le console
  public chartClicked(e:any):void {
    console.log(e);
  }
  public chartHovered(e:any):void {
    console.log(e);
  }

  //Affecter le tri et la pagination
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } 

   //Filtre de recherche pour le tableau
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  

}
