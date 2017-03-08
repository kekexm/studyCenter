app.controller("mUpdataStudentCtrl",['$scope','$http','loginService',function($scope,$http,loginService){
        
    $scope.user={"ret":"200","data":{"user_nation":"汉","birthday":"2017-02-24","uid":"10733","gradeName":"一年级","gradeId":"1","classId":"","sex":"男","schoolId":"1","className":"1班","schoolName":"示例小学","stuNo":"L23108420100316007X","realname":"郭大海"},"message":"获取用户信息成功"}
    
    
    //从session中取用户id和用户类型
    $scope.user.uid = sessionStorage.getItem('userId');//用户id
    $scope.user.userType = sessionStorage.getItem('userType');//用户类型
   
    //获取民族
       $http.get("file/nation.json").success(function(data) {
 		$scope.nationData = data.data;
 	});
    
    //查询学生信息
    loginService.studentMsg({uid : $scope.user.uid,userType : $scope.user.userType},function(res){
        $scope.user = res;
        //把日期字符串截取成数字格式
        console.log(res)
        $scope.year=parseInt($scope.user.data.birthday.substr(0,4))
        $scope.month=parseInt($scope.user.data.birthday.substr(5,7))
        $scope.day=parseInt($scope.user.data.birthday.substr(8,10))
    },function(e){
        consle.log(e);
    });
    
    
    //修改学生信息
    $scope.xgxsxx=function(){
//        alert($scope.user.data.realname)
        $scope.user.data.birthday = $scope.year + '-' + $scope.month + '-' + $scope.day;
        $http.post('http://192.168.9.98:80/JEUC/api/uc/UcStuManagement/updateStuInfo',{uid:$scope.user.data.uid,stuno:$scope.user.data.stuNo,realname:$scope.user.data.realname,sex:$scope.user.data.sex,cid:$scope.user.data.classId,gid:$scope.user.data.gradeId,birthday:$scope.user.data.birthday}).success(function(res){
            if(res.ret = '200'){
                $(".zy_warningBox").show();
                setTimeout(function(){
                            $(".zy_warningBox").hide();
                    },1000)
            }
        }).error(function(e){
            console.log(e)
        })
    }
}])