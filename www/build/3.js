webpackJsonp([3],{

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalPageModule", function() { return ModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal__ = __webpack_require__(292);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ModalPageModule = /** @class */ (function () {
    function ModalPageModule() {
    }
    ModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__modal__["a" /* ModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__modal__["a" /* ModalPage */]),
            ],
        })
    ], ModalPageModule);
    return ModalPageModule;
}());

//# sourceMappingURL=modal.module.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ModalPage = /** @class */ (function () {
    function ModalPage(datepipe, navCtrl, navParams, view) {
        this.datepipe = datepipe;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.data = {};
        this.data.hora_inicio = '';
        this.data.hora_fin = '';
        this.data.detalles_cita = '';
    }
    ModalPage.prototype.ionViewWillLoad = function () {
    };
    ModalPage.prototype.ionViewDidLoad = function () {
        var data = this.navParams.get('data');
        //console.log(data)
        //alert(JSON.stringify(data))
        //let latest_date =this.datepipe.transform(date, 'yyyy-MM-dd');
        this.data.hora_inicio = data.inicio;
        this.data.hora_fin = data.fin;
        this.data.detalles_cita = data.titulo;
    };
    ModalPage.prototype.closeModal = function () {
        this.view.dismiss();
    };
    ModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-modal',template:/*ion-inline-start:"C:\Users\tauro\Desktop\APP_AGENDA_TOPMEDICOS\Agenda_TOP_MEDICOS\src\pages\modal\modal.html"*/'<!--\n  Generated template for the ModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!--\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Detalles</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="closeModal()">Close</button>\n    </ion-buttons>    \n  </ion-navbar>\n</ion-header>\n-->\n\n<ion-content class="main-view">\n\n  <div class="overlay" (click)="closeModal()"></div>\n  <div class="modal_content">\n    <h2>Detalles de cita</h2>\n    <h5>Inicio de videoasistencia: </h5>{{data.hora_inicio}}\n    <h5>Fin de Videoasistencia: </h5>{{data.hora_fin}}\n    <h5>Detalles: </h5>{{data.detalles_cita}}\n\n      <button ion-button outline item-end icon-right color="Primary" (click)="login()">Videoasistencia<br><!-- loguear -->\n        <ion-icon name="ios-videocam"></ion-icon>\n      </button>\n  </div>\n  \n\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\tauro\Desktop\APP_AGENDA_TOPMEDICOS\Agenda_TOP_MEDICOS\src\pages\modal\modal.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["d" /* DatePipe */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["d" /* DatePipe */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]) === "function" && _d || Object])
    ], ModalPage);
    return ModalPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=modal.js.map

/***/ })

});
//# sourceMappingURL=3.js.map