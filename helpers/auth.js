var jwt = require('jsonwebtoken');
var config = require('config');
var _ = require('lodash');

var db = require('./db');
var UsersV2 = require('./models').UsersV2;

var redisClient = db.redisClient;

module.exports = {
	checkToken: checkToken
}

function checkToken(req, res, next) {
	console.log("req.body: ", req.body);
	console.log("req.query: ", req.query);
	console.log("req.headers: ", req.headers);
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	var userIdHeader = req.headers['x-user_id'];
	var authHeader = req.headers['authorization'];

	if (userIdHeader && authHeader) {
		var key = userIdHeader + '.' + authHeader;

		redisClient.getAsync(key)
			.then(data => {
				if (data) {
					var user = JSON.parse(data);

					returnUser(user);
				} else {
					UsersV2.get(userIdHeader, function(err, data) {
						if (err || !data) {
							return next('USER_GET_FAILED');
						}

						var user = data.attrs;
						var twelveHours = 60 * 60 * 12;

						if (user.api_token !== authHeader) {
							return next();
						}

						redisClient.set(key, JSON.stringify(user), 'EX', twelveHours);

						returnUser(user);
					});
				}

			});

		function returnUser(user) {
			req.decoded = _.pick(user, [
				'org_id',
				'user_id',
				'user_role',
				'department_id'
			]);

			next();
		}
	} else {
		if (token) {
			jwt.verify(token, config.get('security.secret'), function(err, decoded) {
				if (err) {
					return next();
				} else {
					req.decoded = decoded;

					return next();
				}
			});
		} else {
			return next();
		}
	}
};
