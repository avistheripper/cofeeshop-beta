(function (window){
var App = window.App || {};
var $ = window.jQuery;

function FormHandler (selector) {

	if (!selector) {
		throw new Error('No selector provided');
	}
	this.$formElement = $(selector);
	if (this.$formElement.length === 0) {
		throw new Error('Could not find element with selector ' + selector);
	}

	FormHandler.prototype.addSubmitHandler = function(fn) {
		console.log('Setting submit handler for form');
		this.$formElement.on('submit', function(event){
			event.preventDefault();


			if($('#flavourShot').val() === "caramel"){

				$('#bill').css({

					'background' : '#ff9933'
				});

			}else if($('#flavourShot').val() === "almond") {

				$('#bill').css({

					'background' : '#993333'
				});

			}else if($('#flavourShot').val() === "mocha") {

				$('#bill').css({

					'background' : '#ffe6b3'
				});

			}



			var data = {};
			$(this).serializeArray().forEach(function(item) {

				data[item.name] = item.value;
				console.log(item.name + " is "+ item.value);
			})
			console.log(data);
			fn(data).then(function () {

			this.reset();
			this.elements[0].focus();
			}.bind(this));

		})
	}
	FormHandler.prototype.addInputHandler = function (fn) {

console.log('setting form handler for input');
this.$formElement.on('input', '[name="emailAddress"]', function(event) {
	var emailAddress = event.target.value;
	var message = '';
	if (fn(emailAddress)) {
		event.target.setCustomValidity('');
	}else{

		message = emailAddress + ' is not an authorized email address!';
		event.target.setCustomValidity(message);
	}

	})

  }

}
$('#strengthLevel').change(function(){

	var range = $(this).val();
	$(".range-value").text(range);
	if (range < 30) {
		$('.range-value').css({
			'color' : 'green'
		});
	} else if(30 < range < 60){
		$('.range-value').css({
			'color' : 'yellow'
		});
	} else if(range > 60) {
		$('.range-value').css({
			'color' : 'red'
		});
	}
});

App.FormHandler = FormHandler;
window.App = App;


}) (window);