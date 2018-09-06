
Utils.compPrefixPath = function(prefix, id) {
	//console.log('Component Dynamic: '+id);
	var plen = prefix.length;
	if (id.substr(0, plen).toLowerCase() === prefix) {
		var path = id.substr(plen).replace(/--/g,'/');
		var last = path.lastIndexOf('/');
		var name = path.substr(last+1);
		var href = path+'/'+name;
		return {
			id: id,
			path: path,
			name: name,
			href: href
		};
	}
};
