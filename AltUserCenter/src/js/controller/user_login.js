 app.controller('loginIndexCtrl',['$scope','$rootScope','loginService','$state','$timeout',function($scope,$rootScope,loginService,$state,$timeout) {
   	//输入数据
   		$scope.userId = {};
 		$scope.userId.uid = sessionStorage.getItem('userId') || '';
   		$scope.data_teach = {
   			username:'',
   			password:'',
   			userType:1
   		}
   		$scope.data_student = {
   			username:'',
   			password:'',
   			userType:2
   		}
   		$scope.data_parents = {
   			username:'',
   			password:'',
   			userType:3
   		}
   		$scope.signDate = new Date;//获取客户端日期
   		switch($scope.signDate.getDay()) {
   			case 0:
   				$scope.sign_week = '星期日';
   			break;
   			case 1:
   				$scope.sign_week = '星期一';
   			break;
   			case 2:
   				$scope.sign_week = '星期二';
   			break;
   			case 3:
   				$scope.sign_week = '星期三';
   			break;
   			case 4:
   				$scope.sign_week = '星期四';
   			break;
   			case 5:
   				$scope.sign_week = '星期五';
   			break;
   			case 6:
   				$scope.sign_week = '星期六';
   			break;
   		}
   		$scope.state = {
   			child_mes:0,//点击切换家长孩子信息
   			signin_end:false,//判断登陆状态
   			loginStatus:0,//login选项卡判断
   		}
   		$scope.form_error = {
   			teach:'请输入符合规则的账号和密码',
   			student:'请输入符合规则的账号和密码',
   			parents:'请输入符合规则的账号和密码',
   			noteTeach:false,
   			noteStudent:false,
   			noteParents:false
   		}
		$scope.userTtile = '';//用户名
		//菜单权限
		$scope.menuLimit = {
			publicMenuMain : [],
			publicMenuSub:[]
		}
		//模拟家长登陆后 自家孩子信息
		$scope.sign_parents= {
			list:['张佳佳','张姨家','张嘉译'],
			listMes:['福海县 第一小学 六年级 二班','福海县 第er小学 六年级 二班','福海县 第三小学 六年级 二班']
		}
		//进入页面后判断用户id是否存在
		if(sessionStorage.getItem('userId')) {
			var userObj = {
				uid:sessionStorage.getItem('userId'),
				userType:sessionStorage.getItem('userType')
			}
			loginService.getUserIdMes(userObj,function(res) {
				$scope.userTtile = res.data.realname;
				if(res.data.state==0){
					return false;
				}
				var userObj = {
					oid:res.data.schoolId
				}
				userObj = JSON.stringify(userObj);
				sessionStorage.setItem('userObj',userObj);
				switch(sessionStorage.getItem('userType')){
					//选择教师模板
					case '1':
						$scope.state.signin_end='teach';
						loginService.loginMenuRequire($scope.userId,function(res) {
							var dataStatus = res.data.publicMenuList[0]?Number(res.data.publicMenuList[0].rid) : 0;
							switch(dataStatus){
								case 1:
									$scope.state.signin_end='teachMain';
									$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
									$scope.menuLimit.publicMenuSub = res.data.persionMenuList;
									console.log(res.data)
								break;
								case 15:
									$scope.state.signin_end='manage';
									$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
									$scope.menuLimit.publicMenuSub = res.data.persionMenuList;
								break;
								default:
									$scope.state.signin_end = 'teach';
									$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
								break;
							}
						},function(e) {
							console.log(e)
						});
					break;
					//选择学生模板
					case '2':
						$scope.state.signin_end = 'teach';
						loginService.getUserIdMes(userObj,function(res) {
							console.log(res)
							$scope.userTtile = res.data.realname;
						},function(e) {
							console.log(e)
						});
						loginService.loginMenuRequire($scope.userId,function(res) {
							$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
						},function(e) {
							console.log(e);
						});
					break;
					//选择家长模板
					case '3':
						$scope.state.signin_end = 'parents';
						loginService.getUserIdMes(userObj,function(res) {
							$scope.userTtile = res.data.realname;
						},function(e) {
							console.log(e)
						});
						//获取菜单权限
						loginService.loginMenuRequire($scope.userId,function(res) {
							$scope.state.signin_end = 'parents';
							$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
						},function(e) {
							console.log(e)
						});
						//获取孩子信息
						loginService.parentChildMsg({uid:userObj.uid},function(res) {
							console.log(res)
						},function(e) {
							console.log(e)
						}) 
					break;
				}
			},function(e) {
				console.log(e)
			});
			
		}
 			
		//模拟登陆后用户菜单信息
		$scope.menuList = {
			"manage":{
				main:[{name:'个人信息',className:"iconfont icon-gerenxinxi"},{name:'账号设置',className:"iconfont icon-zhanghaoshezhi"}],
				sub:[{name:'学校管理',className:"iconfont icon-xuexiaoguanli"},{name:'班级管理',className:"iconfont icon-banjiguanli"},{name:'任课管理',className:"iconfont icon-renkeguanli"},{name:'教师管理',className:"iconfont icon-jiaoshiguanli"},{name:'学生管理',className:"iconfont icon-xueshengguanli"},{name:'家长管理',className:"iconfont icon-jiazhangguanli"}]
			},
			"teach":[{name:'个人信息'},{name:'账号设置'}],
			"mainTeach":{
				main:[{name:'个人信息'},{name:'账号设置'}],
				sub:[{name:'学生管理'},{name:'家长管理'}]
			},
			"student":[{name:'个人信息'},{name:'账号设置'}],
			"parents":[{name:'个人信息'},{name:'账号设置'},{name:'子女资料'}]
		}
		//点击切换
		$scope.changeState = function(status) {
		    $scope.state.loginStatus = status;
		}
		//点击登陆
		$scope.submitDataStudent = function(){
			var regExp = /^[G|L][1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
			if(!regExp.test($scope.data_student.username)||$scope.data_student.username == ''||$scope.data_student.password =='') {
				$scope.form_error_student = '请输入符合规则的账号和密码';
				$scope.form_error.noteStudent = true;
				return false;
			}else{
				$scope.form_error.noteStudent = false;
			}
			 loginService.loginRequire($scope.data_student,function(res) {
				if(res.ret == 40005) {
		    		$scope.form_error.teach = res.message;
    				$scope.form_error.noteStudent = true;
		    	}else if(res.ret == 200) {
		    		// $scope.userTtile = res.data.realname;
		    		sessionStorage.setItem('userId',res.data.id);
		    		sessionStorage.setItem('userType',res.data.userType);
					$state.go('login_index.sub_index',null,{reload:true})
		    	}
			},function(e) {
				console.log(e)
			})
		}
		$scope.submitDataParents = function() {
			var regExp = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
			if(!regExp.test($scope.data_parents.username)||$scope.data_parents.username == ''||$scope.data_parents.password =='') {
				console.log(regExp.test($scope.data_parents.username))
				$scope.form_error.parents = '请输入符合规则的账号和密码';
				$scope.form_error.noteParents = true;
				return false;
			}else{
				$scope.form_error.noteParents = false;
			}
		   loginService.loginRequire($scope.data_parents,function(res) {
				if(res.ret == 40005) {
		    		$scope.form_error.parents = res.message;
    				$scope.form_error.noteParents = true;
		    	}else if(res.ret == 200) {
		    		// $scope.userTtile = res.data.realname;
					sessionStorage.setItem('userId',res.data.id);
		    		sessionStorage.setItem('userType',res.data.userType);
					$state.go('login_index.sub_index',null,{reload:true})
		    		// loginService.loginMenuRequire($scope.userId,function(res) {
		    		// 	$scope.state.signin_end = 'parents';
					// 	$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
		    		// },function(e) {
		    		// 	console.log(e)
		    		// })
		    	}
			},function(e) {
				console.log(e)
			})
		}
		$scope.submitDataTeach = function() {
			var regExp = /^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X))|(([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+)|((13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8})$/;
			if(!regExp.test($scope.data_teach.username)||$scope.data_teach.username == ''||$scope.data_teach.password =='') {
				$scope.form_error_teach = '请输入符合规则的账号和密码';
				$scope.form_error.noteTeach = true;
				return false;
			}else{
				$scope.form_error.noteTeach = false;
			}
			loginService.loginRequire($scope.data_teach,function(res) {
				if(res.ret == 40005) {
		    		$scope.form_error.teach = res.message;
    				$scope.form_error.noteTeach = true;
		    	}else if(res.ret == 200) {
					console.log(res)
		    		sessionStorage.setItem('userId',res.data.id);
		    		sessionStorage.setItem('userType',res.data.userType);
		    		// loginService.loginMenuRequire($scope.userId,function(res) {
    				// 	var dataStatus = res.data.publicMenuList[0]?Number(res.data.publicMenuList[0].rid) : 0
    				// 	switch(dataStatus){
    				// 		case 1:
    				// 			$scope.state.signin_end='teachMain';
    				// 			$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
    				// 			$scope.menuLimit.publicMenuSub = res.data.persionMenuList;
    				// 		break;
    				// 		case 15:
    				// 			$scope.state.signin_end='manage';
    				// 			$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
    				// 			$scope.menuLimit.publicMenuSub = res.data.persionMenuList;
    				// 		break;
    				// 		default:
					// 		console.log(123)
    				// 			$scope.state.signin_end = 'teach';
    				// 			$scope.menuLimit.publicMenuMain = res.data.publicMenuList;
    				// 		break;
    				// 	}
					$state.go('login_index.sub_index',null,{reload:true})

		    		// },function(e) {
		    		// 	console.log(e)
		    		// })
		    		
		    	}
			},function(e) {
				console.log(e)
			})
		}
		//点击切换家长孩子信息
		$scope.changeChildMes = function(index) {
			$scope.state.child_mes = index;
		}
}])