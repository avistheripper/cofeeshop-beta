(function (window){
	'use strict';
	var App = window.App;
	var FORM_SELECTOR = '[data-coffee-order="form"]';
	var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
	var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
	var Truck = App.Truck;
	var DataStore = App.DataStore;
	var RemoteDataStore = App.RemoteDataStore;
	var FormHandler = App.FormHandler;
	var Validation = App.Validation;
	var Checklist = App.Checklist;
	var remoteDS = new RemoteDataStore(SERVER_URL);
	var MyTruck = new Truck('ncc-1701', remoteDS);
	window.MyTruck = MyTruck;
var checklist = new Checklist(CHECKLIST_SELECTOR);
checklist.addClickHandler(MyTruck.delieverOrder.bind(MyTruck));
var formHandler = new FormHandler(FORM_SELECTOR);
formHandler.addSubmitHandler(function (data) {
	return MyTruck.createOrder.call(MyTruck, data).then(function () {
			checklist.addRow.call(checklist, data);
	}, function () {
			throw new Error('404 not found!');
	});
});
	formHandler.addInputHandler(Validation.isCompanyEmail);
	MyTruck.printOrders(checklist.addRow.bind(checklist));
}) (window);