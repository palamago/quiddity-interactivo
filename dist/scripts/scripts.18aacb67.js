"use strict";angular.module("quiddityInteractiveApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]).service("TabletopService",["$q",function(a){this.data=!1,this.getData=function(){var b=this;return a(function(a,c){b.data?a({data:b.data}):(b.loading=!0,Tabletop.init({key:"1gJSWmiZoGJRiE3Ol6wxM1xWFrfHYUboDa6EkzZUgUZQ",callback:function(c,d){b.data={},angular.forEach(d.foundSheetNames,function(a){b.data[a]=c[a].elements.sort(function(a,b){return parseFloat(a.total)<parseFloat(b.total)})}),a({data:b.data})},simpleSheet:!1,postProcess:function(a){return a.total=parseFloat(a.total.replace(",",".")),a.apruebamucho=parseFloat(a.apruebamucho.replace(",",".")),a.apruebapoco=parseFloat(a.apruebapoco.replace(",",".")),a.desapruebamucho=parseFloat(a.desapruebamucho.replace(",",".")),a.desapruebapoco=parseFloat(a.desapruebapoco.replace(",",".")),a.nsnc=parseFloat(a.nsnc.replace(",",".")),a}}))})}}]),angular.module("quiddityInteractiveApp").controller("MainCtrl",["$scope","TabletopService",function(a,b){b.getData().then(function(b){a.data=b.data,console.log(b.data)}),a.candidatoText={macri:"a Macri",scioli:"a Scioli",blanco:"en blanco o inpugnaste",otro:"a otro candidato"},a.category={"macri-macri":"base","scioli-scioli":"oposicion","otro-scioli":"desconfianza","blanco-scioli":"desconfianza","macri-scioli":"desconfianza","blanco-blanco":"desconfianza","otro-blanco":"desconfianza","macri-blanco":"desconfianza","scioli-blanco":"desconfianza","otro-macri":"confianza","scioli-macri":"confianza","blanco-macri":"confianza"},a.primera=null,a.segunda=null,a.selectPrimera=function(b,c){a.primera=c,angular.element(".option-primera").removeAttr("disabled"),b.currentTarget.disabled="disabled",a.renderResponse()},a.selectSegunda=function(b,c){a.segunda=c,angular.element(".option-segunda").removeAttr("disabled"),b.currentTarget.disabled="disabled",a.renderResponse()},a.renderResponse=function(){a.primera&&a.segunda?console.log("render"):console.log("nada")}}]),angular.module("quiddityInteractiveApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("quiddityInteractiveApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="row"> <div class="col-xs-12"> <h1>¿Qué piensan aquellos que votaron como yo?</h1> <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </div> </div> <div class="row"> <div class="col-md-6"> <h2>¿A quién votaste en primera vuelta?</h2> <button class="btn btn-default option-primera" ng-class="{active:primera==\'macri\'}" ng-click="selectPrimera($event,\'macri\')">Mauricio Macri</button> <button class="btn btn-default option-primera" ng-class="{active:primera==\'scioli\'}" ng-click="selectPrimera($event,\'scioli\')">Daniel Scioli</button> <button class="btn btn-default option-primera" ng-class="{active:primera==\'otro\'}" ng-click="selectPrimera($event,\'otro\')">Otro candidato</button> <button class="btn btn-default option-primera" ng-class="{active:primera==\'blanco\'}" ng-click="selectPrimera($event,\'blanco\')">Blanco/Impugnado</button> </div> <div class="col-md-6"> <h2>¿A quién votaste en Ballotage?</h2> <button class="btn btn-default option-segunda" ng-class="{active:segunda==\'macri\'}" ng-click="selectSegunda($event,\'macri\')">Mauricio Macri</button> <button class="btn btn-default option-segunda" ng-class="{active:segunda==\'scioli\'}" ng-click="selectSegunda($event,\'scioli\')">Daniel Scioli</button> <button class="btn btn-default option-segunda" ng-class="{active:segunda==\'blanco\'}" ng-click="selectSegunda($event,\'blanco\')">Blanco/Impugnado</button> </div> </div> <hr> <div ng-show="primera && segunda"> <div class="row"> <div class="col-xs-12"> <p class="lead">Votaste <span class="label label-default">{{candidatoText[primera]}}</span> en primera vuelta y <span class="label label-default">{{candidatoText[segunda]}}</span> en el Ballotage. A las personas encuestadas que votaron como vos, aprueban las gestiones de gobierno en <span class="label label-default">{{data[category[primera+\'-\'+segunda]][0].tema}}</span>, <span class="label label-default">{{data[category[primera+\'-\'+segunda]][1].tema}}</span> y <span class="label label-default">{{data[category[primera+\'-\'+segunda]][2].tema}}</span></p> </div> </div> <div class="row"> <h2 class="text-center">¿Qué gestiones se APRUEBAN más?</h2> <div class="col-md-3"> <h3>Oficialismo <small ng-show="category[primera+\'-\'+segunda]==\'base\'"><span class="label label-default">VOS</span></small></h3> <ol> <li ng-repeat="t in data.base | limitTo:3">{{t.tema}}</li> </ol> </div> <div class="col-md-3"> <h3>Oposición <small ng-show="category[primera+\'-\'+segunda]==\'oposicion\'"><span class="label label-default">VOS</span></small></h3> <ol> <li ng-repeat="t in data.oposicion | limitTo:3">{{t.tema}}</li> </ol> </div> <div class="col-md-3"> <h3>Voto confianza <small ng-show="category[primera+\'-\'+segunda]==\'confianza\'"><span class="label label-default">VOS</span></small></h3> <ol> <li ng-repeat="t in data.confianza | limitTo:3">{{t.tema}}</li> </ol> </div> <div class="col-md-3"> <h3>Voto desconfianza <small ng-show="category[primera+\'-\'+segunda]==\'desconfianza\'"><span class="label label-default">VOS</span></small></h3> <ol> <li ng-repeat="t in data.desconfianza | limitTo:3">{{t.tema}}</li> </ol> </div> </div> <hr> <div class="row"> <h2 class="text-center">¿Qué gestiones se DESAPRUEBAN más?</h2> <div class="col-md-3"> <h3>Oficialismo <small ng-show="category[primera+\'-\'+segunda]==\'base\'"><span class="label label-default">VOS</span></small></h3> <ol> <li ng-repeat="t in data.base | orderBy:\'total\' | limitTo:3">{{t.tema}}</li> </ol> </div> <div class="col-md-3"> <h3>Oposición <small ng-show="category[primera+\'-\'+segunda]==\'oposicion\'"><span class="label label-default">VOS</span></small></h3> <ol> <li ng-repeat="t in data.oposicion | orderBy:\'total\' | limitTo:3">{{t.tema}}</li> </ol> </div> <div class="col-md-3"> <h3>Voto confianza <small ng-show="category[primera+\'-\'+segunda]==\'confianza\'"><span class="label label-default">VOS</span></small></h3> <ol> <li ng-repeat="t in data.confianza | orderBy:\'total\' | limitTo:3">{{t.tema}}</li> </ol> </div> <div class="col-md-3"> <h3>Voto desconfianza <small ng-show="category[primera+\'-\'+segunda]==\'desconfianza\'"><span class="label label-default">VOS</span></small></h3> <ol> <li ng-repeat="t in data.desconfianza | orderBy:\'total\' | limitTo:3">{{t.tema}}</li> </ol> </div> </div> </div> <hr>')}]);