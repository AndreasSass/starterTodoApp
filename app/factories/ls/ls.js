(function() {
	'use strict';

	var modules = [];

	angular
		.module('factory.ls', modules)
		.factory('Ls', Ls);

	function Ls() {
		var subscriptionHandler = {};

		return {
			putOne: putOne,
			putObject: putObject,
			patchObject: patchObject,
			getOne: getOne,
			getAll: getAll,
			getObject: getObject,
			getAllObjects: getAllObjects,
			getObjectTimestamp: getObjectTimestamp,
			deleteOne: deleteOne,
			deleteAll: deleteAll,
			duplicateItem: duplicateItem,
			clear: clear,
			clearSubscriptions: clearSubscriptions,
			subscribeKey: subscribeKey,
			unsubscribeKey: unsubscribeKey
		};

		function subscribeKey(key, fn) {
			// Create array
			if (!subscriptionHandler[key]) {
				subscriptionHandler[key] = [];
			}

			subscriptionHandler[key].push(fn);
		}

		function unsubscribeKey(key, fn) {
			subscriptionHandler[key] = subscriptionHandler[key].filter(function(item) {
				if (item !== fn) {
					return item;
				}
			});
		}

		function subscriptionEventKey(key, o, thisObj) {
			if (subscriptionHandler[key]) {
				var scope = thisObj || window;

				subscriptionHandler[key].forEach(function(item) {
					item.call(scope, o);
				});
			}
		}

		function deleteSubscriptionEvent(key) {
			// Suggestion - might have event to tell that it gets shut down
			if (subscriptionHandler[key]) {
				delete subscriptionHandler[key]
			}
		}

		// PUT //
		function putOne(key, value) {
			localStorage.setItem(key, value);

			subscriptionEventKey(key, value);

			return {
				success: true,
				message: 'Everythings good'
			};
		}

		function putObject(key, value, timestamp) {
			var stringified = JSON.stringify(value);

			if (timestamp) {
				localStorage.setItem(key + ':timestamp', new Date().getTime());
			}

			if (!_.isUndefined(stringified) && stringified !== 'null') {
				localStorage.setItem(key, stringified);

				// Return as object
				subscriptionEventKey(key, value);

				return {
					success: true,
					message: 'Everythings good'
				};
			} else {
				return {
					success: false,
					message: 'Your trying to save a null/undefined value'
				};
			}
		}

		// PATCH //
		function patchObject(key, patchObj) {
			var obj = getObject(key);

			if (_.isUndefined(obj) || _.isNull(obj)) {
				return putObject(key, patchObj);
			} else {
				return putObject(key, angular.extend(obj, patchObj));
			}
		}

		// GET //
		function getOne(key) {
			return localStorage.getItem(key);
		}

		// - Returns an array of string values
		function getAll(keyArr) {
			return _.map(keyArr, getOne);
		}

		// - Returns obj or undefined
		function getObject(key) {
			var value = localStorage.getItem(key);

			return getStorageHandler(value);
		}

		function getObjectTimestamp(key) {
			key = key + ':timestamp';

			return localStorage.getItem(key);
		}

		// - Returns array
		function getAllObjects(keyArr) {
			return _.map(keyArr, getObject);
		}

		// DELETE //
		// - Returns obj tell about how it went
		function deleteOne(key) {
			var testObj = localStorage.getItem(key) || getObject(key);

			// Return as object
			deleteSubscriptionEvent(key);

			if (_.isNull(testObj)) {
				return {
					success: false,
					message: 'Wasn\'t defined already'
				}
			} else {
				localStorage.removeItem(key);

				return {
					success: true,
					message: 'Everythings good'
				}
			}
		}

		function deleteAll(arr) {
			return _.map(arr, deleteOne);
		}

		function duplicateItem(key, newKey) {
			var item = getOne(key);

			return putOne(newKey, item);
		}

		function clear() {
			clearSubscriptions();

			return localStorage.clear();
		}

		function clearSubscriptions() {
			subscriptionHandler = {}
		}

		// Private helper
		function getStorageHandler(value) {
			// Handle invalid values
			if (value === 'undefined' || value === 'null' || _.isNull(value) || _.isUndefined(value)) {
				return undefined;
			} else {
				return value && JSON.parse(value);
			}
		}
	}
})();
