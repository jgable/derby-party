//These should be moved into a utility
function startsWith(str, prefix) {
    return str.lastIndexOf(prefix, 0) === 0;
}
 
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


//Will normalize ID's to ember data properties
export default DS.RESTSerializer.extend({
	normalize: function(type, hash, prop) {
		for(var key in hash){
			if(endsWith(key, 'Id')){
		 		hash[Ember.String.camelize(key.replace('Id', ''))] = hash[key];
		 		delete hash[key];
		 	}
	 	}
	 	return hash;
  	}
});