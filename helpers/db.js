var config = require('config');
var AWS = require('aws-sdk');
var bluebird = require('bluebird');
var redis = require('redis');
var dynogels = require('dynogels');

// Prep db
AWS.config.update({
	region: config.get('aws.region'),
	endpoint: config.get('aws.dynamodb.endpoint')
});

// Prep dynogels
dynogels.AWS.config.update({
	region: config.get('aws.region')
});

var redisClient = redis.createClient(config.redis.port, config.redis.url);

bluebird.promisifyAll(require('dynogels/lib/table').prototype);
bluebird.promisifyAll(require('dynogels/lib/item').prototype);
bluebird.promisifyAll(require('dynogels/lib/query').prototype);
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var scanPrototype = require('dynogels/lib/scan').prototype;
// Update the scan method to include scaning over indexes
scanPrototype.usingIndex = function(name) {
	this.request.IndexName = name;

	return this;
};

bluebird.promisifyAll(scanPrototype);
bluebird.promisifyAll(require('dynogels/lib/parallelScan').prototype);

var dynogels_model = dynogels.model;

dynogels.model = function(name, model) {
	if (model) {
		bluebird.promisifyAll(model);
	}

	return dynogels_model.apply(dynogels, arguments);
};

bluebird.promisifyAll(dynogels);

module.exports = {
	redisClient: redisClient,
	dynogels: dynogels
}
