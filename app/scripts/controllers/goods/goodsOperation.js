'use strict';

/**
 * @ngdoc function
 * @name jingyunshopApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jingyunshopApp
 */
shopbackApp.controller('GoodsOperationController', function ($scope,GoodsOperationService) {
	//图片路径定义
	$scope.img1 ="";
	$scope.img2 ="";
	$scope.img3 ="";
	$scope.img4 ="";
	$scope.img5 ="";

	/*初始化时间格式*/
	$scope.dateOptions = {
		showMonthAfterYear: true, // 月在年之后显示  
	    changeYear: true,
	    changeMonth: true,
	    dateFormat:'yy-mm-dd',  
	    timeFormat: 'HH:mm:ss',
	    yearRange: '1900:-0',
	    showButtonPanel: true,
		showHour: true,
        onSelect: function (dateText, inst) {
           $scope.model=dateText;
       }   
    };
    /*获取当前的商家*/
	GoodsOperationService.merchantlist().success(function(data){
		$scope.merchantlist =data.body;
	}); 
	GoodsOperationService.typelist().success(function(data){
		$scope.typelist =data.body;
	});
	/*获取当前的商家下的品牌*/
	$scope.getbrand = function(goods){
		GoodsOperationService.brandlist(goods.mid).success(function(data){
		$scope.brandlist =data.body;
		}); 
	};
		
	/*上传图片*/
	$scope.doUpload = function(id){
		var form = document.getElementById("fileinfo"+id);  
		var formData = new FormData(form); 
		 var file=document.getElementById("file"+id).files[0];
			if(file!=null){
				 $.ajax({  
						url:'http://localhost:8080/api/resource/upload/single',
					    type: 'POST',  
						data: formData,
						dataType: 'JSON',
						async: false,  
						cache: false,  
						contentType: false,  
						processData: false,  
						success: function (data) {  
						var data = JSON.stringify(data);
						var body = JSON.parse(data).body;
						if(id==1){
							 $scope.img1 =body;
							 $scope.success1 ="上传成功";
						}else if(id==2){
							 $scope.img2 =body;
							 $scope.success2 ="上传成功";
						}else if(id==3){
							 $scope.img3 =body;
							  $scope.success3 ="上传成功";
						}else if(id==4){
							 $scope.img4 =body;
							  $scope.success4 ="上传成功";
						}else if(id==5){
							 $scope.img5 =body;
							  $scope.success5 ="上传成功";
						}
					},
					error: function (data) {alert(JSON.stringify(data));}  
					}); 
			}else{
				alert("上传对象为空!");
			}
		};
	/*保存*/
	$scope.submit=function(goods){
		
		var content = $("#texts").val();
		console.log(content);
		console.log("submit~~~");
		GoodsOperationService.saveGoods(goods,$scope.img1,
			$scope.img2,$scope.img3,$scope.img4,$scope.img5,content);
	};
});