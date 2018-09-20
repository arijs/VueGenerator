module.exports = function all(state, finish, reduce, add) {
	return item;
	function item(ref) {
		add && (ref = add(state, ref));
		return done;
		function done() {
			if (ref instanceof Function) {
				ref = ref(state, arguments);
			}
			var complete = reduce(ref, state, arguments);
			if (complete) {
				finish(complete);
			}
		}
	}
};
