app.controller('teacherCtrinF',['$scope','$http','$stateParams','$state','$timeout',function($scope,$http,$stateParams,$state,$timeout){
	//教师二级个人信息、账号设置切换
	$scope.switch = $stateParams.tableChange;
   	$scope.tab = function(status){
 		$scope.switch=status;
		//  $state.go('teacher_index.teacher_personal',{tableChange:status},{reload:false})
   	};
	$scope.loginState = 0;
   	//定义用于修改提交的用户信息
   	$scope.userUpdate = {
   		"id":"",
   		"password":"",
   		"orgPassword":"",
   		"realname":"",
   		"idCard":""
   	}
   	
   	//修改用户提交
   	$scope.tijiaoUpdate = function(){
   		alert("验证");
   	}
   
 	
 	//添加授课单选默认值
   	$scope.ifRadio = true;
   	$scope.dis = false;
   	
   	//设置成功图片
   	$scope.chenggong = true;
   	
   	//学科组长默认值
   	$scope.ifChecked = false;
   	
   	//班主任默认值
   	$scope.bsd = false;
   	
   	//班主任默认值
   	$scope.asd = false;
   	
   	//定义用户
   	$scope.user = {};
   	
   	//定义民族
   	$scope.nationData = {};
   	
   	//定义区域
   	$scope.areaa = {};
   	
   	//定义学校类型信息
   	$scope.schoolInfo = {};
   	
   	//定义所有学校
   	$scope.schools = {};
   	
   	//定义所有角色
   	$scope.roles = {};
   	
   	//定义年级
   	$scope.grades = {};
   	
   	//定义学科组长信息
   	$scope.leaderInfo = {
   		"stuLevelId": "",
        "gradeName": "",
        "gradeId": "",
        "stuLevelName": "",
        "subjectId": "",
        "subjectName": ""
   	}
   	
   	//提交组长信息
   	$scope.tijiaoLeader = function(){
   		//判断要添加的对象是否有空值用户没选
   		var countList = 0;
		angular.forEach(Object.getOwnPropertyNames($scope.leaderInfo), function(data){
   			if($scope.leaderInfo[data]==""){
   				countList += 1;
   				return;
   			}
		});
		//判断是否有重复的数据
   		var countLeader = 0;
   		var a = {};
   		angular.forEach($scope.user.subjectLeaderInfo, function(data){
   			delete data.$$hashKey;
			if(JSON.stringify($scope.leaderInfo)==JSON.stringify(data)){
				console.log($scope.leaderInfo);
				countLeader += 1;
				return;
			}
		});
   		if(countList>0){
   			$scope.chenggong = false;
   			$scope.warnshow = true;
   			$scope.tishi = "请选择完整";
   			$timeout(function(){
   				$scope.warnshow = false;
   			},1500);
   		}else if(countLeader>0){
   			$scope.chenggong = false;
   			$scope.warnshow = true;
   			$scope.tishi = "您已经是这个学科的组长";
   			$timeout(function(){
   				$scope.warnshow = false;
   			},1500);
   			return;
   		}else{
   			a.stuLevelId = $scope.leaderInfo.stuLevelId;
   			a.gradeName = $scope.leaderInfo.gradeName;
   			a.gradeId = $scope.leaderInfo.gradeId;
   			a.stuLevelName = $scope.leaderInfo.stuLevelName;
   			a.subjectId = $scope.leaderInfo.subjectId;
   			a.subjectName = $scope.leaderInfo.subjectName;
	   		$scope.user.subjectLeaderInfo.push(a);
			$scope.subBox = false;	   		
   		}
   	}
   	
   	$scope.selLeaderSub = function(a){
   		$scope.leaderInfo.subjectId = a.subjectId;
   		$scope.leaderInfo.subjectName = a.subjectName;
   		console.log($scope.leaderInfo);
   	}
   	
   	//定义授课
   	$scope.userCourseList = {
   		 "gradeName": "",
         "gradeId": "",
         "classId": "",
         "versionId": "",
         "className": "",
         "state": "1",
         "versionName": "",
         "subjectId": "",
         "subjectName": ""
   	}
   	
   	//定义切换年级选项卡
   	$scope.gradeTab = 0;
   	
   	//切换年级选项卡
   	$scope.changeGrade = function(index,grade){
   		$scope.gradeTab = index;
   		$scope.leaderInfo.subjectId = "";
   		$scope.leaderInfo.subjectName = "";
   		$scope.leaderInfo.gradeId = grade.gradeId;
   		$scope.leaderInfo.gradeName = grade.gradeName;
   		console.log($scope.leaderInfo);
     	//根据年级查询学科
   		$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findSubjectListByGradeId",{gradeId : 						grade.gradeId}).success(function(data) {
		 		$scope.subjects = data;
		});
   	}
   	
   	//定义班级
   	$scope.classes = {};
   	
   	//定义授课班级
   	$scope.teachClasses = {};
   	
   	//定义授课学科
   	$scope.teachSubject = {};
   	
   	//定义授课版本
   	$scope.teachVersion = {};
   	
   	//根据授课年级查询授课班级
   	$scope.selTeachClass = function(a){
   		if(a==undefined){
   			$scope.teachClasses = null;
	   		$scope.teachSubject = null;
	   		$scope.teachVersion = null;
		   	$scope.userCourseList = {
		   		 "gradeName": "",
		         "gradeId": "",
		         "classId": "",
		         "versionId": "",
		         "className": "",
		         "state": "1",
		         "versionName": "",
		         "subjectId": "",
		         "subjectName": ""
		   	}
	   		console.log($scope.userCourseList);
   			$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findClassListByGradeId",{gradeId : 						$scope.userCourseList.gradeId}).success(function(data) {
		 		$scope.teachClasses = data;
			 });
   		}else{
	   		$scope.teachClasses = null;
	   		$scope.teachSubject = null;
	   		$scope.teachVersion = null;
	   		$scope.userCourseList.classId = "";
	   		$scope.userCourseList.subjectName = "";
	   		$scope.userCourseList.versionId = "";
	   		$scope.userCourseList.className = "";
	   		$scope.userCourseList.versionName = "";
	   		$scope.userCourseList.subjectId = "";
	   		
	   		$scope.userCourseList.gradeName = a.gradeName;
	   		console.log($scope.userCourseList);
	   		$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findClassListByGradeId",{gradeId : 						$scope.userCourseList.gradeId}).success(function(data) {
			 		$scope.teachClasses = data;
			 });
   		}
   	}
   	
   	//删除授课
   	$scope.deleteTeach = function(a){
   		console.log(a);
   		$scope.user.userCourseList.splice(a,1);
   	}
   	
   	//根据授课班级查询授课学科
   	$scope.selTeachSub = function(a){
   		if(a==undefined){
   			$scope.userCourseList.classId = "";
	   		$scope.userCourseList.subjectName = "";
	   		$scope.userCourseList.versionId = "";
	   		$scope.userCourseList.className = "";
	   		$scope.userCourseList.versionName = "";
	   		$scope.userCourseList.subjectId = "";
	   		$scope.teachSubject = null;
	   		$scope.teachVersion = null;
   		}else{
   			$scope.teachSubject = null;
	   		$scope.teachVersion = null;
	   		$scope.userCourseList.subjectName = "";
	   		$scope.userCourseList.versionId = "";
	   		$scope.userCourseList.versionName = "";
	   		$scope.userCourseList.subjectId = "";
	   		$scope.userCourseList.className = a.className;
	   		console.log($scope.userCourseList);
	   		$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findSubjectByClassId",{classId : 						$scope.userCourseList.classId}).success(function(data) {
			 		$scope.teachSubject = data;
			 });
   		}
   	}
   	console.log($scope.asd);
   	//根据授课学科查询授课版本
   	$scope.selTeachVersion = function(a){
   		if(a==undefined){
   			$scope.teachVersion = null;
   			$scope.userCourseList.subjectName = "";
	   		$scope.userCourseList.versionId = "";
	   		$scope.userCourseList.versionName = "";
	   		$scope.userCourseList.subjectId = "";
   		}else{
	   		$scope.teachVersion = null;
	   		$scope.userCourseList.versionId = "";
	   		$scope.userCourseList.versionName = "";
	   		$scope.userCourseList.subjectName = a.subjectName;
	   		console.log($scope.userCourseList);
	   		$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findVersionBySubjectId",{subjectId : 						$scope.userCourseList.subjectId}).success(function(data) {
			 		$scope.teachVersion = data;
			 });
   			
   		}
   	}
   	
   	//添加授课最后的选项
   	$scope.selTeachLast = function(a){
   		if(a==undefined){
   			$scope.userCourseList.versionId = "";
	   		$scope.userCourseList.versionName = "";
   		}else{
	   		$scope.userCourseList.versionName = a.versionName;
	   		console.log($scope.userCourseList);
   		}
   	}
   	
   	//添加授课
   	$scope.addTeach = function(){
   		//判断要添加的对象是否有空值用户没选
   		var countList = 0;
		angular.forEach(Object.getOwnPropertyNames($scope.userCourseList), function(data){
   			if($scope.userCourseList[data]==""){
   				countList += 1;
   				return;
   			}
		});  		 
   		var countTeach = 0;
   		var b = {};
   		angular.forEach($scope.user.userCourseList, function(data){
   			delete data.$$hashKey;
			if(JSON.stringify($scope.userCourseList)==JSON.stringify(data)){
				countTeach += 1;
			}
		});
   		if(countList>0){
   			$scope.chenggong = false;
   			$scope.warnshow = true;
 			$scope.tishi = "请选择完整";
 			$timeout(function(){
 				$scope.warnshow = false;
 			},1500);
   		}else if(countTeach>0){
   			$scope.chenggong = false;
   			$scope.warnshow = true;
 			$scope.tishi = "您已经添加过这个课程";
 			$timeout(function(){
 				$scope.warnshow = false;
 			},1500);
   		}else{
   			b.gradeName = $scope.userCourseList.gradeName;
   			b.gradeId = $scope.userCourseList.gradeId;
   			b.classId = $scope.userCourseList.classId;
   			b.versionId = $scope.userCourseList.versionId;
   			b.className = $scope.userCourseList.className;
   			b.state = $scope.userCourseList.state;
   			b.versionName = $scope.userCourseList.versionName;
   			b.subjectId = $scope.userCourseList.subjectId;
   			b.subjectName = $scope.userCourseList.subjectName;
	   		$scope.user.userCourseList.push(b);
			$scope.teachBox = false;
   		}
   	}
   	
   	//定义学科
   	$scope.subjects = {};
   	
   	//查询所有角色
   	$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findRoleList").success(function(data) {
		 		$scope.roles = data;
		 	});
   	
   	//民族下拉列表,访问静态文件
 	$http.get("file/nation.json").success(function(data) {
 		$scope.nationData = data.data;
 		
 	});
 	
 	$scope.changeminzu = function(a){
 		if(a==undefined){
 			$scope.user.userNation = null;
 		}
 	}
   	
   	//一进页面在session取值然后调后台信息
   	$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findPersonalInfoByUid",{uid : sessionStorage.getItem('userId'),userType : sessionStorage.getItem('userType')}).success(function(data) {
   		console.log(data);
   		//账号设置 用于修改用户
   		$scope.userUpdate.id = $scope.user.id;
   		$scope.userUpdate.realname = data.data.realname;
   		$scope.userUpdate.idCard = data.data.id_card;
   		$scope.loginState = data.data.state;
   		//个人信息用户
 		$scope.user = data.data;
   		//用于班主任一进页面如果有所教的年级。查询班级
   		if($scope.user.tea_gradeId!=null&&""!=$scope.user.tea_gradeId){
   			$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findClassListByGradeId",{gradeId : 						$scope.user.tea_gradeId}).success(function(data) {
		 		$scope.classes = data;
		 		console.log(data);
		 });
   		}
 		$scope.user.roles =$scope.user.roles.split(',');
	 	$scope.rfalse = true;
	 	$scope.checkStyle = function(id) {
	 		if($scope.user.roles.indexOf(id)>=0){
	 			return true
	 		}else{
	 			return false
	 		}
	 	}
	 	if($scope.user.roles.indexOf($scope.roles.data.role3.roleId)>=0){
	 		$scope.asd = true
	 	}
	 	if($scope.user.roles.indexOf($scope.roles.data.role2.roleId)>=0){
	 		$scope.bsd = true
	 	}
	 	if($scope.user.roles.indexOf($scope.roles.data.role4.roleId)>=0){
	 		$scope.ifChecked = true
	 	}
	 	
 		//根据区域id学校类型查询所有学校
 		if($scope.user.areaId!=""&&$scope.user.stuLevel!=""){
		 	$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findShcoolList",{areaId : 						$scope.user.areaId,gradeId:$scope.user.stuLevel}).success(function(data) {
		 		$scope.schools = data.data;
		 	});
		 	
		 	//通过学校id查询年级
		 	$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findGradeListBySchoolId",{schoolId : 						$scope.user.schoolId}).success(function(data) {
		 		$scope.grades = data;
		 		console.log(data);
		 		$scope.leaderInfo.gradeId = data.data[0].gradeId;
		 		$scope.leaderInfo.gradeName = data.data[0].gradeName;
		 		//根据年级查询学科
   				$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findSubjectListByGradeId",{gradeId : 						data.data[0].gradeId}).success(function(data) {
		 			$scope.subjects = data;
				});
		 	});
 		}
		 	
		 	//查询学校类型
		 	$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findLevelList").success(function(data) {
		 		$scope.schoolInfo = data.data;
//		 		user.stuLevel
				angular.forEach(data.data, function(data){
					if(data.stuLevelId==$scope.user.stuLevel){
						$scope.leaderInfo.stuLevelId = data.stuLevelId;
						$scope.leaderInfo.stuLevelName = data.stuLevelName;
					}
				});
		 	});
		 	
 	});
 	
 	//查询学校(区域请选择)
 	$scope.selSchoolArea = function(a){
 		console.log(a);
 		if(a==undefined){
 			$scope.leaderInfo = {
		        "stuLevelId": "",
		        "gradeName": "",
		        "gradeId": "",
		        "stuLevelName": "",
		        "subjectId": "",
		        "subjectName": ""
		    }
 			$scope.user.areaId = null;
   			$scope.schools = null;
   			$scope.user.schoolId = null;
 			$scope.grades = {};
 			$scope.classes = {};
			$scope.user.tea_gradeId = null;
	 		$scope.user.tea_classId = null;
	 		$scope.user.gradeLeaderGid = null;
 		}else if($scope.user.areaId!=null){
 			$scope.leaderInfo.stuLevelId = a.stuLevelId;
 			$scope.leaderInfo.stuLevelName = a.stuLevelName;
	 		$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findShcoolList",{areaId : 						$scope.user.areaId,gradeId:$scope.user.stuLevel}).success(function(data) {
		 		$scope.schools = data.data;
		 	});
 		}else{
 			$scope.leaderInfo.stuLevelId = a.stuLevelId;
 			$scope.leaderInfo.stuLevelName = a.stuLevelName;
 		}
 	}
 	
 	//查询学校(学校类型请选择)
 	$scope.selSchoolLevel = function(a){
 		console.log(a);
 		if(a==undefined){
 			$scope.leaderInfo = {
		        "stuLevelId": "",
		        "gradeName": "",
		        "gradeId": "",
		        "stuLevelName": "",
		        "subjectId": "",
		        "subjectName": ""
		    }
 			$scope.user.stuLevel = null;
   			$scope.schools = null;
   			$scope.user.schoolId = null;
 			$scope.grades = {};
 			$scope.classes = {};
			$scope.user.tea_gradeId = null;
	 		$scope.user.tea_classId = null;
	 		$scope.user.gradeLeaderGid = null;
 		}else if($scope.user.areaId!=null){
 			$scope.leaderInfo.stuLevelId = a.stuLevelId;
 			$scope.leaderInfo.stuLevelName = a.stuLevelName;
	 		$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findShcoolList",{areaId : 						$scope.user.areaId,gradeId:$scope.user.stuLevel}).success(function(data) {
		 		$scope.schools = data.data;
		 	});
 		}else{
 			$scope.leaderInfo.stuLevelId = a.stuLevelId;
 			$scope.leaderInfo.stuLevelName = a.stuLevelName;
 		}
 	}
 	
    //根据学校查询年级(班主任、年级组长)
 	$scope.selGrade = function(a){
 		if(a==undefined){
 			$scope.user.schoolId = null;
 			$scope.grades = {};
 			$scope.classes = {};
			$scope.user.tea_gradeId = null;
	 		$scope.user.tea_classId = null;
	 		$scope.user.gradeLeaderGid = null;
 		}else{
 			$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findGradeListBySchoolId",{schoolId : 						$scope.user.schoolId}).success(function(data) {
		 		$scope.grades = data;
		 		console.log(data);
		 		$scope.classes = null;
		 		$scope.user.tea_gradeId = null;
		 		$scope.user.tea_classId = null;
		 		$scope.user.gradeLeaderGid = null;
		 		$scope.leaderInfo.gradeId = data.data[0].gradeId;
		 		$scope.leaderInfo.gradeName = data.data[0].gradeName;
		 	});
		 	
		 	//根据学校查询学科
		 	$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findSujectListByOfficeId",{schoolId : 						$scope.user.schoolId}).success(function(data) {
		 		$scope.subjects = data;
		 	});
 		}
 	}
 	
    //根据学校，年级查询班级（班主任）
 	$scope.selClass = function(){
 		$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findClassListByGradeId",{gradeId : 						$scope.user.tea_gradeId}).success(function(data) {
		 		$scope.classes = data;
		 		console.log(data);
		 });
 	}
 	
 	//查询区域信息
 	$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findUserAreaByAreaId",{areaId : "5d3458f31f5e4cd498b1371cb42ae39a"}).success(function(data) {
 		$scope.areaa = data.data;
 	});
 	
 	$scope.checkedAction = function(event,id) {
 		var action = event.target.checked?'add':'remove';
   		if(action=='add'&& $scope.user.roles.indexOf(id)==-1){
   			$scope.user.roles.push(id)
   		}
   		if(action=='remove'&& $scope.user.roles.indexOf(id)!=-1){
   			var inx = $scope.user.roles.indexOf(id);
   			$scope.user.roles.splice(inx,1);
   		}
   		console.log($scope.user.roles)
 	}
 	$scope.checkedActionSub = function(event,id,state) {
 		if(!state&&$scope.user.roles.indexOf(id)==-1){
 			$scope.user.roles.push(id)
 		}
 		if(state&&$scope.user.roles.indexOf(id)!=-1){
 			var inx = $scope.user.roles.indexOf(id);
   			$scope.user.roles.splice(inx,1);
 		}
 		   		console.log($scope.user.roles)
 	}
 	
 	//定义警告弹窗初始为false隐藏
 	$scope.warnshow = false;
 	$scope.tishi = null;
 	
 	//提交表单
 	$scope.submitInfo = function(){
 		//手机号等验证
 		if($scope.user.userNation==null||""==$scope.user.userNation){
 			$scope.chenggong = false;
 			$scope.warnshow = true;
 			$scope.tishi = "请选择民族";
 			$timeout(function(){
 				$scope.warnshow = false;
 			},1500);
 			return;
 		}
 		if($scope.user.userMobile==null||""==$scope.user.userMobile){
 			$scope.phone_wrong = true;
 			return;
 		}
 		if($scope.user.userEmail==null||""==$scope.user.userEmail){
 			$scope.mail_wrong = true;
 			return;
 		}
 		//是否选择单位
 		if($scope.user.areaId==null||""==$scope.user.areaId){
 			$scope.chenggong = false;
 			$scope.warnshow = true;
 			$scope.tishi = "请选择区域";
 			$timeout(function(){
 				$scope.warnshow = false;
 			},1500);
 			return;
 		}
 		if($scope.user.stuLevel==null||""==$scope.user.stuLevel){
 			$scope.chenggong = false;
 			$scope.warnshow = true;
 			$scope.tishi = "请选择学校类型";
 			$timeout(function(){
 				$scope.warnshow = false;
 			},1500);
 			return;
 		}
 		if($scope.user.schoolId==null||""==$scope.user.schoolId){
 			$scope.chenggong = false;
 			$scope.warnshow = true;
 			$scope.tishi = "请选择学校";
 			$timeout(function(){
 				$scope.warnshow = false;
 			},1500);
 			return;
 		}
   		//是否有班主任角色
   		if($scope.bsd==false){
   			$scope.user.tea_gradeId = null;
   			$scope.user.tea_classId = null;
   		}else if($scope.user.tea_gradeId==null||$scope.user.tea_classId==null){
   			$scope.chenggong = false;
   			$scope.warnshow = true;
   			$scope.tishi = "请选择班主任管理的年级或者班级";
   			$timeout(function(){
   				$scope.warnshow = false;
   			},1500);
   			return;
   		}
   		//是否有年级组长角色
   		if($scope.asd==false){
   			$scope.user.gradeLeaderGid = null;
   		}else if($scope.user.gradeLeaderGid==null){
   			$scope.chenggong = false;
   			$scope.warnshow = true;
   			$scope.tishi = "请选择年级组长管理的年级";
   			$timeout(function(){
   				$scope.warnshow = false;
   			},1500);
   			return;
   		}
 		//是否有学科组长的角色
 		console.log($scope.ifChecked);
 		if($scope.ifChecked==false){
 			$scope.user.subjectLeaderInfo = [];
 		}
 		if($scope.ifChecked==true&&$scope.user.subjectLeaderInfo.length==0){
 			$scope.chenggong = false;
 			$scope.warnshow = true;
   			$scope.tishi = "请选择学科";
   			$timeout(function(){
   				$scope.warnshow = false;
   			},1500);
   			return;
 		}
 		//是否有授课
 		if($scope.ifRadio==true){
 			$scope.user.giveLession = 1;
 			if($scope.user.userCourseList.length==0){
 				$scope.chenggong = false;
 				$scope.warnshow = true;
	 			$scope.tishi = "请添加授课";
	 			$timeout(function(){
	 				$scope.warnshow = false;
	 			},1500);
 				return;
 			}
 		}else{
 			$scope.user.giveLession = 0;
 			$scope.user.userCourseList = [];
 		}
 		//角色变成字符串
 		if($scope.user.roles==null||""==$scope.user.roles){
 			$scope.chenggong = false;
 			$scope.warnshow = true;
 			$scope.tishi = "请选择角色";
 			$timeout(function(){
 				$scope.warnshow = false;
 			},1500);
 			return;
 		}
 		$scope.user.roles = $scope.user.roles.join(",");
 		$scope.user.uid = sessionStorage.getItem('userId')
 		console.log(angular.toJson($scope.user));
   		$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/saveUserInfo",{param : 						angular.toJson($scope.user)}).success(function(data) {
		 		if(data.ret=="200"){
		 			$scope.chenggong = true;
		 			$scope.warnshow = true;
		 			$scope.tishi = "提交成功";
		 			$timeout(function(){
		 				$scope.warnshow = false;
						$state.go('login_index.sub_index')
		 			},1500);
		 		}else{
		 			$scope.chenggong = false;
		 			$scope.warnshow = true;
		 			$scope.tishi = "提交失败";
		 			$timeout(function(){
		 				$scope.warnshow = false;
		 			},1500);
		 		}
		 });
 	}
 	
}]);

//自定义指令展示角色
app.directive('rolesList', function () {
        return {
            restrict: 'ECAM',
            template: '<span ng-repeat="role in roles.data.role1"><input ng-model="r" ng-checked="checkStyle(role.roleId)" type="checkbox" id="{{role.roleId}}" ng-click = "checkedAction($event,role.roleId)"/><label ng-class='+"{'zy_active':checkStyle(role.roleId)?rfalse:r}"+' for="{{role.roleId}}">{{role.roleName}}</label></span>',
            replace:true
        }
})

app.directive('rolesBanzhuren', function () {
        return {
            restrict: 'ECAM',
            template: '<span><input name="" type="checkbox" id="{{roles.data.role2.roleId}}" value="" ng-model="b" ng-checked="checkStyle(roles.data.role2.roleId)"/><label ng-class='+"{'zy_active':checkStyle(roles.data.role2.roleId)?rfalse:b}"+' for="{{roles.data.role2.roleId}}" ng-bind="roles.data.role2.roleName" ng-click="checkedAction($event,roles.data.role2.roleId)"></label></span>',
            replace:true
        }
})

//自定义学科组长展示过滤器
app.filter('subjectLeaderInfoFilter',function(){
    return function(obj){
        return obj.gradeName+obj.subjectName;
    }
})

//自定义班级过滤器
app.filter("classfilter",function(){
	return function(name){
		return name+"班";
	}
});









