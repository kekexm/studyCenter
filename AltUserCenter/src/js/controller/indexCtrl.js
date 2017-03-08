//首页的控制器
app.controller('indexCtrl',['$scope','loginService','$state',function($scope,loginService,$state) {
//	$scope.dlzt = false;
	if(sessionStorage.getItem('userId')) {
		var userObj = {
			uid:sessionStorage.getItem('userId'),
			userType:sessionStorage.getItem('userType')
		}
		loginService.getUserIdMes(userObj,function(res) {
			if(res.ret==200){
				if(!res.data.state){
					return false
				}
				$scope.dlzt = true;
				$scope.dlzt_name = res.data.realname;
			}
			

		},function(e) {
			console.log(e)	
		})
	}else{
		$scope.dlzt = false;
	}
	//点击退出按钮
	$scope.login_out = function(){
		loginService.userLoginOut(function(res) {
			sessionStorage.clear(); 
			$scope.dlzt = false;
			$state.go('login_index.sub_index',null,{reload:true})
		},function(e) {
			alert(e)
		})
	}
	
	
	
}])
