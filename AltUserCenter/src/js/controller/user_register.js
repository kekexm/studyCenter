app.controller('registerIndexCtrl',['$scope','$rootScope','loginService','$state','$timeout',function($scope,$rootScope,loginService,$state,$timeout) {
   		//输入数据
   		$scope.userId = {};
 		$scope.userId.uid = sessionStorage.getItem('userId') || '';
   		$scope.register_teacher = {
   			realName:'',
   			idNumber:'',
   		}
   		
   		
   		$scope.form_error = {
   			teacher:'请输入您的真实姓名和身份证号',
   			noteTeacher:false,
   		}

		//点击注册
		$scope.registerDataTeacher = function() {
			var regExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			if($scope.register_teacher.realname == '' || $scope.register_teacher.idNumber =='' || !regExp.test($scope.register_teacher.idNumber)) {
				$scope.form_error.teacher = '请输入您的真实姓名和身份证号';
				$scope.form_error.noteTeacher = true;
				return false;
			}else{
				$scope.form_error.noteTeacher = false;
			}
			
			loginService.registerRequire($scope.register_teacher,function(res) {
			if(res.ret == 201) {
		    		$scope.form_error.teacher = res.message;
    				$scope.form_error.noteTeacher = true;
		    	}else if(res.ret == 200) {
		    		sessionStorage.setItem('userId',res.data.id);
		    		sessionStorage.setItem('userType',1);
	    			$state.go('teacher_index.teacher_personal',res.data.id,{reload:true})
		    	}
			},function(e) {
				console.log(e);
			})
		}

}])