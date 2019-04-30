import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatePipe } from '@angular/common'

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

  constructor(public datepipe: DatePipe, public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    this.data.hora_inicio = '';
    this.data.hora_fin = '';    
    this.data.detalles_cita = '';    
  }

  ionViewWillLoad(){

  }

  ionViewDidLoad(){
    const data = this.navParams.get('data');
    //console.log(data)
    //alert(JSON.stringify(data))
    //let latest_date =this.datepipe.transform(date, 'yyyy-MM-dd');

    this.data.hora_inicio = data.inicio;
    this.data.hora_fin  = data.fin;
    this.data.detalles_cita = data.titulo;
  }

  closeModal(){
    this.view.dismiss();
  }
}
