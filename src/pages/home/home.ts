import { Component, ɵConsole } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http'; //https://stackoverflow.com/questions/43609853/angular-4-and-ionic-3-no-provider-for-http
import {DatabaseProvider } from '../../providers/database/database';
import { BackgroundMode } from '@ionic-native/background-mode';
import { NativeAudio } from '@ionic-native/native-audio';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { LoadingController } from 'ionic-angular';

import { UniqueDeviceID } from '@ionic-native/unique-device-id';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {    
  
    loading:any;
    isPainted:boolean = false;
    resp:any;
    band=0;
    data:any = {};
    data2:any = {};
    horarios_medico:any;
    numeroFilas:any;
    eventsCalendar = [];
    contadorCitas = 0;
    bodyNotification:string = "Corriendo en segundo plano";
    isIosDevice:boolean=false;
    
    
  constructor(private uniqueDeviceID: UniqueDeviceID, public loadingCtrl: LoadingController, private toast: Toast, public plt: Platform, private localNotifications: LocalNotifications, public nativeAudio: NativeAudio , private backgroundMode: BackgroundMode,public navCtrl: NavController, private http:Http,private alertCtrl: AlertController, private database: DatabaseProvider) {

    this.data.username = '';
    this.data.response = '';    
    this.http = http;  

    
    if(window.localStorage.getItem("numFilasDBremota") == null){
        window.localStorage.setItem("numFilasDBremota","0")
    }
    
    
    //Precargamos el audio para poder utilizarlo en las notificaciones de una actualizacion de la BD
    this.nativeAudio.preloadSimple('audio1', 'audio/good.mp3').then((msg)=>{
        console.log("message: " + msg);
    }, (error)=>{
        console.log("error: " + error);
    });
  
    this.backgroundMode.setDefaults({
        title: "Agenda BM",
        text: this.bodyNotification,
        icon: 'icon2.png', // this will look for icon.png in platforms/android/res/drawable|mipmap
        color: '65cab6', // hex format like 'F14F4D'
        bigText: true    
    })


    this.uniqueDeviceID.get()
  .then((uuid: any) => {
    console.log("UUID Nuevo: "+uuid)
    localStorage.setItem("UUID_Phone",uuid);


    this.verificarActualizacionDeDatosRemotosEnBackground() //Verificaremos los datos de la BD remota cada 10 segundos
    this.insertIdMedicoToken()

    
  })
  .catch((error: any) => {
    console.log("ERROR Nuevo: "+error)
  });

 



  
  } //Fin del Constructor

/**************************************************************************************************************/
/**************************************************************************************************************/
/**************************************************************************************************************/          
actualizarAgenda(){

/*
  //Mensaje de actualizacion con un alert
  this.toast.show(`Actualizando agenda...`, '2000', 'bottom').subscribe(
    toast => {
      console.log(toast);
    }
  );
*/

this.consultarHorariosBDremota2();

//Mensaje de actualizacion con un spinner
  this.loading = this.loadingCtrl.create({
    spinner: 'circles',
    content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">Actualizando las citas de su agenda...</div>
      </div>`,
    //duration: 1000
  });

  this.loading.onDidDismiss(() => {
    console.log('Dismissed loading');
  });

  this.loading.present();
  
  

}

// Schedule a single notification
lanzarNotificacion2(){
this.localNotifications.schedule({  
  title: 'Notificacion demo',  
  text:"Mi texto"
});
}

lanzarNotificacion(){ //Hay un problema al tener notificaciones locales y notificaciones push en ios y android > 6
  console.log("Lanzando notificacion\n"+"Titulo: "+localStorage.getItem("TitleNotification")+"\nTexto: "+localStorage.getItem("MessageNotification"))
    this.localNotifications.schedule({
        title: localStorage.getItem("TitleNotification"),
        text: localStorage.getItem("MessageNotification"),
        //attachments: ['file://img/activado.png'],//Pone una imagen en la notificacion
        sound: 'file://audio/good.mp3', //Solo funciona en iOS
        icon: 'file://img/green_notification.png', // this will look for icon.png in platforms/android/res/drawable|mipmap
        foreground: true
    });
}

/**************************************************************************************************************/
/**************************************************************************************************************/
/**************************************************************************************************************/          


ionViewDidLoad() {                                   
//    this.consultarHorariosBDremota()
this.consultarHorariosBDremota2()
/*    
    setInterval(() => {
        if(this.backgroundMode.isActive()==false)
            console.log("consultarHorariosBDremota() En el foreground")
            this.consultarHorariosBDremota();//Estaremos verificando cada 5 segundos
    }, 5000);    
*/

  if (this.plt.is('android')) {
    setInterval(() => {
      if(this.backgroundMode.isActive()==false){
          console.log("checarCambiosNotificacionesRecibidas() En el foreground")
          this.checarCambiosNotificacionesRecibidas()
      }
    }, 3000);   
  }

}
/**************************************************************************************************************/
/**************************************************************************************************************/
/**************************************************************************************************************/          

verificarActualizacionDeDatosRemotosEnBackground(){
    this.backgroundMode.enable(); //Habilitamos el modo background
    //alert("Mensaje desde funcion en fondo")
    
    var resultadoBoolean = this.backgroundMode.isEnabled(); //Esto nos servira para saber si esta habilitado
    //alert("Esta habilitado BackgroundMode: "+resultadoBoolean)

    //Funcion que se ejecuta cuando se minimiza el app
    this.backgroundMode.on("activate").subscribe(()=>{        
        //alert("Imprimiendo datos de fondo...Esta activo")


/*        
            setInterval(() => {
                if(this.backgroundMode.isActive()==true){
                    console.log("consultarHorariosBDremota() En el background")
                    this.consultarHorariosBDremota();//Estaremos verificando cada 10 segundos
                }
            }, 10000); 
*/        


  if(this.plt.is('android')) {
    setInterval(() => {
      if(this.backgroundMode.isActive()==true){
          console.log("checarCambiosNotificacionesRecibidas() En el background")
          this.checarCambiosNotificacionesRecibidas();
      }
    }, 3000); 
  }


    }); 
        
  }

/**************************************************************************************************************/
/**************************************************************************************************************/
/**************************************************************************************************************/           
  public playAudio(){
/*      
    this.backgroundMode.enable();    
    this.backgroundMode.on("activate").subscribe(()=>{
      this.nativeAudio.play("audio1");  
    });
*/    
    this.nativeAudio.play("audio1"),() => console.log('audio1 is done playing');

  }
  /**************************************************************************************************************/
  /********** Esta se tiene que ejecutar para obtener los datos de la BD en el servidor de expediente ***********/
  /**************************************************************************************************************/          
  consultarHorariosBDremota(){    
    if(window.localStorage.getItem("id_doctor") != undefined)
    {      
      var link = 'http://93.104.215.239/ecg_mqtt/DATABASE/agendaMedicos.php';
      var id_medico = JSON.stringify({id_medico: window.localStorage.getItem("id_doctor")});
            
        this.http.post(link, id_medico)
        .subscribe(data => {
            this.data.response = data["_body"]; 

            this.resp = JSON.parse(this.data.response);
            this.horarios_medico = JSON.stringify(this.resp['horarios']);
            this.numeroFilas = JSON.stringify(this.resp['numFilas']);
            window.localStorage.setItem("numFilasDBActual",this.numeroFilas)
            //alert("LocalStorageXD: "+window.localStorage.getItem("numFilasDBremota")+" numberFilas:"+this.numeroFilas)

                if(window.localStorage.getItem("numFilasDBremota") != this.numeroFilas){                    
                    //Limpiamos la BD local para poder insertar los nuevos valores de la BD remota
                    //alert("Hay datos nuevos que agregar ")
                    this.isPainted = false;
                    this.eventsCalendar.splice(0,this.eventsCalendar.length) //Vaciar el arreglo que contiene los elementos a pintar en el calendario
                    this.clearTable();       
                    //this.lanzarNotificacion();
                    //this.playAudio(); //Esta funcion la utilizabamos antes de usar las notificaciones
                }else{
                    //alert("No ha habido cambios en la base de datos remota, siguen habiendo "+window.localStorage.getItem("numFilasDBremota"))
                    if(this.isPainted == false){                        
                        this.getCitas();
                    }else{
                        //alert("No vamos a pintar nada")
                    }
                }
        },  error => {
            console.log("Oooops!");
            alert("No se pudieron enviar los datos\nIntentelo mas tarde");
            });
    }else{
            alert("El doctor no tiene un  ID asignado")
         }   
  }

  /**************************************************************************************************************/
  /**************************************************************************************************************/            
  /**************************************************************************************************************/            
checarCambiosNotificacionesRecibidas(){  
  
  if(localStorage.getItem("NotificacionRecibida") != null){
    console.log("VaLOR DEL ESTADO DE NOTIFICACIONES: "+localStorage.getItem("NotificacionRecibida"))
    //this.backgroundMode.on("activate").subscribe(()=>{  
      if(localStorage.getItem("NotificacionRecibida") == "1"){
          this.consultarHorariosBDremota2()          
      }
    //})
  }  
}
  /**************************************************************************************************************/
  /********** Esta se tiene que ejecutar para obtener los datos de la BD en el servidor de expediente ***********/
  /**************************************************************************************************************/          
  consultarHorariosBDremota2(){    
    if(window.localStorage.getItem("id_doctor") != undefined)
    {     
      console.log("Estado notificacion recibida: "+localStorage.getItem("NotificacionRecibida"))
      //alert("Se haran cambios en la base local por que se detectó una notificacion") 
//      var link = 'http://93.104.215.239/ecg_mqtt/DATABASE/agendaMedicos.php';
      var link = 'https://topmedic.com.mx/accessDatabase/wp_DB/service/recibirDatos.php';
      
      var id_medico = JSON.stringify({id_medico: window.localStorage.getItem("id_doctor")});
            
        this.http.post(link, id_medico)
        .subscribe(data => {
            this.data.response = data["_body"]; 

            this.resp = JSON.parse(this.data.response);
            this.horarios_medico = JSON.stringify(this.resp['horarios']);
            this.numeroFilas = JSON.stringify(this.resp['numFilas']);
            console.log("Resultado consulta: "+JSON.stringify(this.resp))
            window.localStorage.setItem("numFilasDBActual",this.numeroFilas)
            //alert("LocalStorageXD: "+window.localStorage.getItem("numFilasDBremota")+" numberFilas:"+this.numeroFilas)
                                  
                    //Limpiamos la BD local para poder insertar los nuevos valores de la BD remota
                    //alert("Hay datos nuevos que agregar ")
                    this.isPainted = false;
                    this.eventsCalendar.splice(0,this.eventsCalendar.length) //Vaciar el arreglo que contiene los elementos a pintar en el calendario
                    this.clearTable();       
                    //alert("Estado notificacion: "+localStorage.getItem("NotificacionRecibida"))
                    if(localStorage.getItem("NotificacionRecibida")=="1"){
                      //alert("Ha llegado una notificacion!")
                      this.lanzarNotificacion();
                    }
                    //this.playAudio(); //Esta funcion la utilizabamos antes de usar las notificaciones
                    localStorage.setItem("NotificacionRecibida","0")
        },  error => {
            console.log("Oooops!");
            alert("No se pudieron enviar los datos\nIntentelo mas tarde");
            });
    }else{
            alert("El doctor no tiene un  ID asignado")
         }   
  }

  /**************************************************************************************************************/
  /**************************************************************************************************************/            
  /**************************************************************************************************************/            

  insertIdMedicoToken(){    

    //var link = 'http://93.104.215.239/ecg_mqtt/DATABASE/insertarAgendaMedicos.php';
    var link = 'https://topmedic.com.mx/accessDatabase/wp_DB/service/recibirDatos.php';
    
    var id_token = JSON.stringify({id_medico: window.localStorage.getItem("id_doctor"), tokenPhoneMedico:localStorage.getItem("phoneToken"),UUID_Phone:localStorage.getItem("UUID_Phone")});
          
    
    //alert("Se enviaran los datos: "+JSON.stringify({id_medico: window.localStorage.getItem("id_doctor"), tokenPhoneMedico:localStorage.getItem("phoneToken")}))

          try {

            this.http.post(link, id_token)                  
            .subscribe(data => {              
      
              this.data2.response = data["_body"]; 

              //alert(JSON.stringify(this.data2.response))
     
              var resp = JSON.parse(this.data2.response);                            
              
                  if(resp['response'] == "200"){
                        //alert("Se insertaron correctamente los datos en la bd")
                        console.log("Se insertaron correctamente los datos en la bd")
                  }else if(resp['response'] == "100"){
                    //alert("Los datos de este medico ya se habian registraron en la BD")
                    console.log("El token de las notificaciones push se ha actualizado en la BD")
                  }else{
                    //alert("No se pudieron insertar los datos :(")
                    console.log("No se pudieron insertar los datos :(")
                  }
                  
              }, error => {

                alert("No se pudieron enviar los datos\nIntentelo mas tarde");          
              });
      
            } catch (error) {
              alert("Hay un error en el servidor")
            }

  
          
  }

/**************************************************************************************************************/
/**************************************************************************************************************/
/**************************************************************************************************************/  
  almacenarHorariosEnLocalBD(fecha_consulta: string, hora:string, horb:string, descripcion: string, link_token: string, numCitas:number){
    this.database.almacenarCitasEnBD(fecha_consulta, hora,horb,descripcion, link_token, numCitas).then((data) =>{                
        //console.log(JSON.stringify("Numero de datos insertados: "+data))
        
        if(JSON.stringify(data) == numCitas+""){
            //alert("Se agregaron todas las citas de la BD remota a la DB local")
            this.getCitas();
        }

    },(error) => {
        console.log("Error al crear usuario: "+error)
        //alert("xdxdxd: "+error)
        //alert("Error al crear: "+error)
    })
    
}
/**************************************************************************************************************/
/*************** Con esta funcion obtendremos las citas del medico almacenadas en la BD local *****************/
/**************************************************************************************************************/
getCitas(){
    this.eventsCalendar = []; //Vaciamos el arreglo por si tiene eventos anteriores
    
    //Usamos la funcion creada en el proveedor database.ts para obtener los datos de las citas
    this.database.obtenerCitas().then((data: any) => {
      //console.log("Resultado getCitas(): "+JSON.stringify(data.length));

        //if(this.contadorCitas == 0){

            //alert("Ahora pintaremos "+data.length+" citas en el calendario")
            for (let i = 0; i < data.length; i++) {
                const element = data[i];            
                
                let fecha_consulta_g = JSON.stringify(data[i]['fecha_consulta'])
                let hora_g = JSON.stringify(data[i]['hora'])
                let horb_g = JSON.stringify(data[i]['horb'])
                let descripcion_g = JSON.stringify(data[i]['descripcion'])
                let link_token_g = JSON.stringify(data[i]['link_token'])

                let fecha_consulta_SC = fecha_consulta_g.replace(/"/g, ''); 
                var hora_SC = hora_g.replace(/"/g, ''); 
                var horb_SC = horb_g.replace(/"/g, ''); 
                var descripcion_SC = descripcion_g.replace(/"/g, ''); 
                var link_token_SC = link_token_g.replace(/"/g, ''); 
                
                //alert("Desde funcion getcitas principal : Fecha "+fecha_consulta_SC+" Hora: "+hora_SC+" "+" Hora Fin"+horb_SC)
                //Con esta linea mandamos a actualizar los eventos de la BD local en el calendario
                this.eventSource = this.addSchedules(fecha_consulta_SC, hora_SC, horb_SC, descripcion_SC);
                this.isPainted = true;
            }
            this.contadorCitas = 1;
/*
        }else{
            alert("Ya no se puede realizar mas consultas")
        }
*/
    }, (error) => {
      console.log(error);
      //alert("error: "+error)
    })
    this.loading.dismiss(); 
  }
/**************************************************************************************************************/
/**************************************************************************************************************/
/**************************************************************************************************************/          

  rellenarArregloConConsultaBDremota(){
    var resp2 = JSON.parse(this.horarios_medico);
    var nFilas = JSON.parse(this.numeroFilas);

        //alert("Se agregaran "+nFilas+" nuevas filas")

        if(this.resp['respValue'] == "200"){

            for (let i = 0; i < Object.keys(resp2).length; i++) {
                const element = this.resp['horarios'][i];
                var fecha_consulta = JSON.stringify(element['fecha_consulta'])
                var hora = JSON.stringify(element['hora'])
                var horb = JSON.stringify(element['horb'])
                var descripcion = JSON.stringify(element['descripcion'])
                var link_token = JSON.stringify(element['token'])

                var nombre = JSON.stringify(element['nombre_paciente'])
                var aPaterno = JSON.stringify(element['paterno'])
                

                var fecha_consulta_SC = fecha_consulta.replace(/"/g, ''); 
                var hora_SC = hora.replace(/"/g, ''); 
                var horb_SC = horb.replace(/"/g, ''); 
                var descripcion_SC = descripcion.replace(/"/g, '');
                
                var nombre_SC = nombre.replace(/"/g, '');
                var aPaterno_SC = aPaterno.replace(/"/g, '');
                var link_token_SC = link_token.replace(/"/g, '');
                

                var descripcionCompuesta = "Cita con "+nombre_SC+" "+aPaterno_SC+" "+descripcion_SC; 
                //alert(" "+nombre_SC+" "+aPaterno_SC+" "+" "+aMaterno_SC);
                
                //this.eventSource es el evento en el html que se ira refrescando 
                //this.eventSource = this.addSchedules(fecha_consulta_SC, hora_SC, horb_SC, descripcion_SC);
                this.almacenarHorariosEnLocalBD(fecha_consulta_SC, hora_SC, horb_SC, descripcionCompuesta,link_token_SC, nFilas);
            }
            window.localStorage.setItem("numFilasDBremota",window.localStorage.getItem("numFilasDBActual"))
        }else{
        alert("Hubo un error en la consulta de los horarios")        
        }
  }
/**************************************************************************************************************/
/**************************************************************************************************************/
/**************************************************************************************************************/          
clearTable(){

    //alert("Entrando a limpiar tabla local")
    this.database.limpiarTabla().then((data) =>{
        console.log("Tabla Borrada: "+data)
        //alert("Tabla local Borrada!!!");
        //alert("Rellenaremos el arreglo para insertar en la BD local")
        this.rellenarArregloConConsultaBDremota();

    },(error) => {
        console.log("Error no se pudo borrar tabla: "+error)
        alert("Error no se pudo borrar tabla: "+error)
    })
}
/**************************************************************************************************************/
/**************************************************************************************************************/
/**************************************************************************************************************/            
  eventSource;
  viewTitle;
  isToday: boolean;
  calendar = {
      locale: 'es-MX',
      autoSelect: 'true',
      mode: 'month',
      currentDate: new Date()
  }; // these are the variable used by the calendar.
  loadEvents() {
      //this.eventSource = this.createRandomEvents();
      this.eventSource = this.addEvent();      
      //this.eventSource = this.addSchedules(); 
  }

  onViewTitleChanged(title) {
      this.viewTitle = title;
  }
  onEventSelected(event) {
      console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
      //alert(event.title)
      this.alertDetallesEvento( event.title )
  }
  changeMode(mode) {
      this.calendar.mode = mode;
  }
  today() {
      this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }
  onCurrentDateChanged(event:Date) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();

      //alert("Cambio de pantalla")
  }

  alertDetallesEvento(evento){

    let alert = this.alertCtrl.create({
      title: '<center><h4>Detalles</h4></center>',
      subTitle: evento,
      buttons: ['Aceptar']
    });
    alert.present();
  }
    
/********************************************************************************************************/
/****************************** Funcion para agregar un evento manualmente  *****************************/
/********************************************************************************************************/
  //Agregar eventos uno a uno de la base de datos
  //createEvent(title, location, notes, startDate, endDate)
  addEvent(){

    var startTime;
    var endTime;
    var events2 = [];

    //Formato de la base de datos de Saul
    startTime = "2019-01-15 17:30:00"
    endTime = "2019-01-19 18:00:00"

    var startTime3v = "2019-01-15 13:30:00"
    var endTime3v = "2019-01-16 15:00:00" 

    let startTime2 = new Date(startTime);
    let endTime2 = new Date(endTime);
    
    let startTime3 = new Date(startTime3v);
    let endTime3 = new Date(endTime3v);

    events2.push({
        title: 'Cita con paciente Jorge',
        startTime: startTime2,
        endTime: endTime2,
        allDay: false        
    },
    {
        title: 'Cita con paciente Maria',
        startTime: startTime3,
        endTime: startTime3,
        allDay: false        
    }

    );


    alert("Se a agregado un evento")
    //alert(startTime2)
    alert("startTime2: "+startTime+"\nendTime: "+endTime)
    return events2;
  }

/********************************************************************************************************/
/********************* Funcion para agregar los horarios descargados desde la BD ************************/
/********************************************************************************************************/

    //Agregar eventos uno a uno de la base de datos
  //createEvent(title, location, notes, startDate, endDate)
  addSchedules(dateM, startHour, endHour, description){
  
    
    var startTime;
    var endTime;
    
     //Formato de la base de datos de Saul
    startTime = dateM+" "+startHour;
    endTime = dateM+" "+endHour; 

    let inicio = new Date(startTime);
    let fin = new Date(endTime);
    

    var startTimeMOD = startTime;
    //var stm = new Date(startTimeMOD.replace(' ', 'T'));
    var stm = new Date(startTimeMOD.replace(/-/g, '/'));

    var endTimeMOD = endTime;
    //var stmf = new Date(endTimeMOD.replace(' ', 'T'));
    var stmf = new Date(endTimeMOD.replace(/-/g, '/'));

    if (this.plt.is('ios')) {
      // This will only print when on iOS
      console.log('I am an iOS device!');

        this.eventsCalendar.push({
          title: description,
          startTime: stm,
          endTime: stmf,
          allDay: false        
        });  

        //alert("stm: "+stm+"\stmf: "+stmf)
        console.log("stm: "+stm+"\stmf: "+stmf)

    }else if (this.plt.is('android')) {
      // This will only print when on iOS
      console.log('I am an android device!');
        this.eventsCalendar.push({
          title: description,
          startTime: inicio,
          endTime: fin, 
          allDay: false     
        });

        //alert("inicio: "+inicio+"\nendTime: "+fin)
        console.log("inicio: "+inicio+"\nendTime: "+fin)
    }

/*
    alert("Se a agregado un evento")    
    alert("startTime: "+startTime+"\nendTime: "+endTime)
    alert("inicio: "+inicio+"\nendTime: "+fin)
    alert("Tamaño arreglo consultas: "+this.eventsCalendar.length)
    alert("Contenido arreglo consultas: "+JSON.stringify(this.eventsCalendar[0]))
    console.log("Contenido arreglo consultas: "+JSON.stringify(this.eventsCalendar[0]))
*/
    
    return this.eventsCalendar;
  }
/********************************************************************************************************/
/********************************************************************************************************/
/********************************************************************************************************/



  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }


  markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };
    

}
