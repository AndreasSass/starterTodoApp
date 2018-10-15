(function() {
	'use strict';

	let login = {
		templateUrl: '/components/login/login.html',
		controller: /*@ngInject*/loginController,
		bindings: {
			content: '<'
		}
	};

	function loginController($timeout) {
		let ctrl = this;

		ctrl.$onInit = () => {
			ctrl.newTodoText = '';
			ctrl.todos = [{
				text: 'My first todo',
				done: false
			}];
		}

		ctrl.addTodo = ($event) => {
			$event.stopPropagation()

			let newTodo = {
				text: ctrl.newTodoText,
				done: false
			}

			ctrl.todos.push(newTodo);

			ctrl.newTodoText = '';
		}
	}

	angular
		.module('component.login', [])
		.component('login', login);
})();
