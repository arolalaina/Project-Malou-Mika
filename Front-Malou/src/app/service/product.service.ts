import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
 
  actuals_posts : any
  list_topics : any
  posts_count_per_topics : any

  async getPostsByDate(criteria_date: string) {
    const headers = {
      'Content-Type': 'application/json',
       'Accept': 'application/json'
    };
    await this.http.get(environment.apiUrl+''+ criteria_date, { headers }).toPromise()
      .then(data => {
        this.actuals_posts = data;
        return true;
      }, error => console.log('error ', error));
  }

  async getPostsByCreateAtDate(criteria_date: string) {
    const headers = {
      'Content-Type': 'application/json',
       'Accept': 'application/json'
    };
    await this.http.get(environment.apiUrl+'v1/' + criteria_date, { headers }).toPromise()
      .then(data => {
        this.actuals_posts = data;
        return true;
      }, error => console.log('error ', error));
  }

  //Fonction pour Pie-Chart
  //J'ai essayer avec les requetes avec les api mais ca ne fonctionne pas
  //Et je suis au courant que plusieurs boucles ne seras pas vraiment la manière approprié s'il y a des données massives
  //Mais je voulais juste adapter pour celle-ci
  //Fonction pour regrouper tout les topics des posts dans une array avec le nom arrayTopic
  sortWithTopic(){
    var posts = this.actuals_posts.posts;
    let length = posts.length;
    var arrayTopic = [];
     //Grande boucle pour tout les posts
    for(var i = 0 ; i < length ; i++){
          let arrayTopicLength = arrayTopic.length;
          var topic;
          //On verifie si le post a un topic et si oui, on va prendre le nom de celle-ci
          if(posts[i].topics[0]){
            topic = posts[i].topics[0].name
            //Si l'array est encore vide, on push le premier topic
            if(arrayTopicLength == 0){
               arrayTopic.push(topic);
            } else {
              //Dans l'autre cas, on va ajouter une référence qui va permettre de voir si le topic est déja dans l'array
              var reference = false;
              for(var j = 0 ; j < arrayTopicLength ; j++){
                if(topic == arrayTopic[j]){
                  reference = true;
                }
              }
              //Si la référence reste false, on peut ajouter le topic dans notre array
              if(!reference)  arrayTopic.push(topic);
            }
          }
    }
    //on affecte le valeur pour cette classe service 
    this.list_topics = arrayTopic;
    //Et on fait appelle a la fonction ci-dessous pour le regrouppement des posts
    this.countPostsForTopics(arrayTopic);
    return true;
  }

  //Fonction pour compter tout le nombre de post pour chaque topic et stocker les valeurs dans un tableu numérique
  countPostsForTopics(arrayTopic){
    var posts = this.actuals_posts.posts;
    let length = posts.length;
    let arrayTopicLength = arrayTopic.length;
    var arrayCount = new Array(arrayTopicLength);
    //Initier les variables a number 0 pour ne pas avoir erreur, ceci pour les données du Pie-Chart
    for(var i = 0 ; i < arrayTopicLength ; i++){
      arrayCount[i] = 0;
    }
    //Grande boucle pour tout les posts
    for(var i = 0 ; i < length ; i++){
      //Un post peut avoir plusieurs topic, donc on va boucler toutes ses topics
      //Et d'autre part, un post pourrai ne pas avoir de topic
      var postTopicLength = posts[i].topics.length;
      //Cette condition verifie donc qu'un post aurait un topic ou non
      if(postTopicLength != 0){
        //Si oui, on boucle celle-ci et on la compare avec notre array de topic existant
        for(var j = 0 ; j < postTopicLength ; j++){
          for(var k = 0 ; k < arrayTopicLength ; k++){
            if(posts[i].topics[j].name==arrayTopic[k]){
              //on ajoute le nombre une fois s'il en existe et on interromp la boucle après
              arrayCount[k]+=1;
              break;
            }
          }
        }
      }
    }
    //on affecte le valeur pour cette classe service 
    this.posts_count_per_topics = arrayCount;
    return true;
  }

}
