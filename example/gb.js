angular.module('googleBot', [])
  .service('gBot', ['$window', '$state', function ($window, $state) {
    var self = this;
	
	self.initiated = false;
	self.active = false;
	self.redirect = [];
	
	
	self.isActive = function(e){ 
		if(!self.initiated) {
			self.init();
			self.initiated = true;
		}
		
		if(!self.active) return false;
		else {
			e.preventDefault();
			self.active = false;
			$state.go(self.redirect[0], self.redirect[1]);
			return true;
		}
	};
	
	
	self.init = function(){
		
		//var returned = false;
		
		if($window.location.search.search("_escaped_fragment_=") > -1){
			
			var params = $window.location.search.replace(/^\?/, "").split("&");
			angular.forEach(params, function(item, ind){
				
				if(item.split("=")[0] === "_escaped_fragment_"){
					
					//activate
					var result = { 
						url: item.split("=")[1], 
						target: [] 
					};
					angular.forEach(result.url.split("/"), function(itemb, indb){
						if(itemb) result.target.push(itemb);
					});
					
					
					//search
					angular.forEach($state.get(), function(state, state_ind){
						if(!state.abstract){
							var state_result = { target: [], params: [] };
							
							angular.forEach(state.url.replace(/^\^/, "").split("/"), function(itemb, indb){
								if(itemb.search(":") > -1) state_result.params.push(itemb.replace("?", "").replace(":", ""));
								else if(itemb) state_result.target.push(itemb);
							});
							
							//compare
							var check = result.target.length === state_result.target.length + state_result.params.length;
							angular.forEach(state_result.target, function(target, index){
								if(result.target[index] !== target) check = false;
							});
							
							//success
							if(check){
								
								var final_params = {};
								angular.forEach(state_result.params, function(param, index){
									final_params[param] = result.target[state_result.target.length + index];
								});
								
								//returned = [state.name, final_params];
								self.redirect = [state.name, final_params];
								self.active = true;
								return false;
							}
						}
					});
					
				}
			});
		}
		
		return;
	};
}]);
