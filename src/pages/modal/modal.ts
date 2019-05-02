import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  data:any = {};
  hora_inicio:String;
  hora_fin:String;
  detalles_cita:any;
  tipo_servicio:any;
  link_token:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    this.data.hora_inicio = '';
    this.data.hora_fin = '';    
    this.data.detalles_cita = '';    
    this.data.tipo_servicio = '';  
    this.data.link_token = '';  
  }

  ionViewWillLoad(){

  }

  ionViewDidLoad(){
    const data = this.navParams.get('data');    

    //alert("En el modal: "+JSON.stringify(data))
    //console.log("En el modal: "+JSON.stringify(data))

    this.data.hora_inicio = data.hora;
    this.data.hora_fin  = data.horb;
    this.data.detalles_cita = data.descripcion;
    this.data.tipo_servicio = data.tipo_servicio;
    this.data.link_token = "https://topmeddr.com:3005/"+data.link_token+"/d";

  }

  iniciarVideoconferencia(){    
    var ref = window.open(this.data.link_token, '_blank', 'location=no');
  }


  closeModal(){
    this.view.dismiss();
  }
}
