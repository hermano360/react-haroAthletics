const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
	? 'pk_live_MY_PUBLISHABLE_KEY'
	: 'pk_test_isqamEERLx0pQJVekIgO9Njy';

export default STRIPE_PUBLISHABLE;

