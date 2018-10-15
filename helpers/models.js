var dynogels = require('./db').dynogels;
var Joi = require('joi');

exports.Orgs = dynogels.define('Orgs', {
	tableName: 'Orgs',
	hashKey: 'org_id',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	schema: {
		org_id: Joi.string(),
		org_name: Joi.string(),
		internal_org_name: Joi.string(),

		// Contact
		contact_email: Joi.string(),
		contact_phone: Joi.string(),
		billing_email: Joi.string(),

		// Fonts
		has_font: Joi.boolean(),
		basic_font: Joi.string(),
		header_font: Joi.string(),

		// Coloring
		has_color: Joi.boolean(),
		primary_color: Joi.string(),
		text_color: Joi.string(),

		// TODO - make invoice handling directly in the platform

		// Info
		industry: Joi.string(),				// Index by industry
		total_employee_count: Joi.number(), // Filter by "TOL/MOL/BOL"
		employee_licenses: Joi.number(),	// Filter by employee licenses
		admin_licenses: Joi.number(),		// Filter by admin licenses

		// Messages
		message_from: Joi.string(),
		welcome_message: Joi.string(),
		timeline_message: Joi.string(),

		// Basic settings
		package_type: Joi.string(),
		org_logo_media_id: Joi.string(),
		prevent_printing: Joi.boolean(),
		signup_terms_accepted: Joi.boolean(),
		total_media_size: Joi.string(),
		customer_id: Joi.string(),
		is_deleted: Joi.string(),
		created_at: Joi.string(),

		// Outdated - Keep for backwards compatebility
		domain_url: Joi.string(),			// Deprecated
		distribution_id: Joi.string(),		// Deprecated
		distribution_etag: Joi.string()		// Deprecated
	}
});


// Users V2
exports.UsersV2 = dynogels.define('Users', {
	// Settings
	tableName: 'Users-v2',
	hashKey: 'user_id',
	timestamps : true,

	// Schema
	schema: {
		user_id: dynogels.types.uuid(),

		// items of interest
		org_id: Joi.string(),
		email: Joi.string().email(),
		phone_number: Joi.string(),

		// Social login
		linkedin_id: Joi.string(),

		// Rest
		code: Joi.string(),
		department_id: Joi.string(),
		job_title: Joi.string(),
		lang: Joi.string(),
		password: Joi.string(),
		image_key: Joi.string(),
		user_name: Joi.string(),
		internal_user_name: Joi.string(),
		last_name: Joi.string(),
		internal_last_name: Joi.string(),
		user_role: Joi.string(),

		// For activating user
		activate_hash: Joi.string(),

		// Api token
		api_token: Joi.string(),

		// Policy consent
		policyConsent: Joi.object().keys({
			"consent_version": Joi.number(),
			"policy_consent": Joi.boolean(),
			"consent_date": Joi.string()
		})
	},

	// Index
	indexes: [{
		hashKey: 'org_id',
		name: 'org_id-index',
		type: 'global'
	}, {
		hashKey: 'phone_number',
		name: 'just-phone_number-index',
		type: 'global'
	}, {
		hashKey: 'email',
		name: 'just-email-index',
		type: 'global'
	}, {
		hashKey: 'linkedin_id',
		name: 'just-linkedin_id-index',
		type: 'global'
	}]
});
