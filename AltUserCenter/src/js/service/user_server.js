app.service('loginService',['$http','$timeout',function($http,$timeout) {
	console.log('service');
	//进入页面后获取id请求用户信息
	this.getUserIdMes = function(uid,succ,error) {
		$http.post('http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findPersonalInfoByUid',uid)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}
	//注册请求
	this.registerRequire = function(data,succ,error) {
		$http.post('http://192.168.9.98:80/JEUC/api/uc/ucUserWeb/registerTeacher',data)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			alert("error");
			error(e)
		})
	}
	//登陆请求
	this.loginRequire = function(data,succ,error) {
		$http.post('http://192.168.9.98:80/JEUC/api/UcUser/login',data)
		.success(function(res) {
			succ(res)
			
		})
		.error(function(e) {
			error(e)
		})
	}
	
	//
	//获取菜单权限
	this.loginMenuRequire = function(id,succ,error) {
		$http.post('http://192.168.9.98:80/JEUC/api/UcUser/menu',id)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}
	//退出登录
	this.userLoginOut = function(succ,error) {
		$http.get('http://192.168.9.98:80/JEUC/api/UcUser/logout')
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}
	//通过家长id获取孩子信息
	this.parentChildMsg = function(pid,succ,error) {
		$http.post('http://192.168.9.98:80/JEUC/api/UcUser/findChildUcUserByUId',pid)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}



	//教师管理请求
	//请求用户列表
	this.teachHandleUserList = function(parames,succ,error) {
		$http.post('http://192.168.9.98:80/JEUC/api/UcUser/teacherListByOid',parames)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}
	//请求教师管理-审核、删除、回收、停用等接口
	this.teachHandleUpdataList = function(parames,succ,error) {
		$http.post('http://192.168.9.98:80/JEUC/api/UcUser/updateUser',parames)
		.success(function(res) {
			succ(res)
		})
		.error(function(e) {
			error(e)
		})
	}
	//学生管理
	//通过学校id获取年级
	this.studentHandleGradeList = function(parames,succ,error) {
		$http.post('http://192.168.9.98:80/JEUC/api/uc/UcStuManagement/getGradeByOid',parames)
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
	//通过年级id获取班级
	this.studentHandleClassList = function(parames,succ,error){
		$http.post('http://192.168.9.98:80/JEUC/api/uc/UcStuManagement/getClassByGid',parames)
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}
	//通过班级id获取学生信息
	this.studentHandleUserList = function(parames,succ,error) {
		$http.post('http://192.168.9.98:80/JEUC/api/uc/UcStuManagement/getStuInfo',parames)
		.success(function(res){
			succ(res)
		})
		.error(function(e){
			error(e)
		})
	}

    //通过学生id获取学生信息
    this.studentMsg = function(uid,succ,error){
        $http.post('http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findPersonalInfoByUid',uid)
		.success(function(res) {
           succ(res)
		})
		.error(function(e) {
			console.log(uid)
		})
    }

}])

