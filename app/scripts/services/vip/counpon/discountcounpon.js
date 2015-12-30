'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.service('DiscountcounponService', function ($http, $location, ApiService) {

	//新增
	this.add = function(cashcounpon, amount){

	}

	//查询
	this.list = function(cashcounpon, from, size){
		return $http.get(ApiService.api.counpon.discountcounpon.list.replace(':from', from).replace(':size', size)
			,{params:{"cardNum": cashcounpon.cardNum , "value":cashcounpon.value ,"locked": cashcounpon.locked }});
	}
	//解锁
	this.unlock = function(ids){
		return $http.put(ApiService.api.counpon.discountcounpon.unlock.replace(":ids",ids));
	}

});