app.controller('studentCtrl',['$scope','loginService','$http',function($scope,loginService,$http){
        $scope.switch=0;
        $scope.same=0;
        $scope.tab=function(n){
            $scope.switch=n
        }
        
        //定义用户对象
        $scope.user = {
            
        }
        //名族对象
        
        //从session中获取信息
        $scope.user.stuId = sessionStorage.getItem('userId') ;
   	    $scope.user.userType = sessionStorage.getItem('userType') ;
        console.log($scope.user.stuId);
        //调用service层获取数据
    
        //获取学生信息
       loginService.studentMsg({uid : $scope.user.stuId,userType : $scope.user.userType},function(res){
            console.log(res.ret);
            $scope.user.id = res.data.uid;//学生id
            $scope.user.realname = res.data.realname;//学生姓名
            $scope.user.stuNo = res.data.stuNo;//学生学籍号
            $scope.user.gradeName = res.data.gradeName;//年级名称
            $scope.user.className = res.data.className;//班级名称
            $scope.user.sex = res.data.sex;//性别
            $scope.user.schoolName = res.data.schoolName;//学校名称
            $scope.user.userNation = res.data.user_nation;//民族
            $scope.user.year = parseInt(res.data.birthday.substr(0,4));//生日-年
            $scope.user.month = parseInt(res.data.birthday.substr(5,2));//生日-月
            $scope.user.day = parseInt(res.data.birthday.substr(8,2));//生日-天
            $scope.user.gradeId = res.data.gradeId;
            $scope.user.classId = res.data.classId;
            $scope.user.schoolId = res.data.schoolId;
            $scope.user.img  = res.data.userFace;
        },function(e){
            alert($scope.user.stuId)
        })
       
       
       
       //获取民族
       $http.get("file/nation.json").success(function(data) {
 		$scope.nationData = data.data;
 	});
       
    
    
       //提交信息
        $scope.submitStudentMsg = function(user){
            
            $scope.user.birthday = $scope.user.year+"-"+$scope.user.month+"-"+$scope.user.day
            //alert($scope.user.userNation)
            $http.post('http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/saveUserInfo',{uid:$scope.user.id,userNation:$scope.user.userNation,userType:$scope.user.userType,birthdayStr:$scope.user.birthday}).success(function(data){
                if(data.ret == '200'){
                    alert('提交成功！');
                }
            }).error(function(e){
                console.log(e);
            });    

        }
        
        //图片上传
        $scope.upload = function(){
                var fd = new FormData();
                var file = document.querySelector('input[type=file]').files[0];
                fd.append('filename', file);
                fd.append("id",$scope.user.id);
                //console.log(fd.get('filename'));
            $http({     
	               method:'POST',
	               url:"http://192.168.9.98:80/JEUC/api/uc/ucUserWeb/saveUpLoadFile",
	               data: fd,
                   headers: {'Content-Type':undefined},
	               transformRequest: angular.identity 
	               }).success( function ( res ){
                    console.log(res)
                    if(res.ret == "200"){
                       $scope.user.img = res.data.imgPath;
                       console.log($scope.user.img)
                   }else{
                       alert("头像上传失败！")
                  }
	           })
                
        }
        
        //修改密码
        $scope.updateStudentMsg = function(user){
         
            
            
            if($scope.user.orgPassword==""||$scope.user.orgPassword==null){
                $scope.same = 2;
            }else if($scope.user.orgPassword.length<6){
                $scope.same = 2;
            }
            else if($scope.user.newpassword==""||$scope.user.newpassword==null){
                 $scope.same = 3;
            }
            else if($scope.user.newpassword.length<6){
                $scope.same = 3;
            }else if($scope.user.newpassword!=$scope.user.renewpassword){
                $scope.same = 1;
            }else {
                 $scope.same = 0
                 //提交
                var fd = new FormData();
                fd.append("id",$scope.user.id);
                fd.append("password",$scope.user.newpassword);
                fd.append("orgPassword",$scope.user.orgPassword);
        
	            $http({     
	               method:'POST',
	               url:"http://192.168.9.98:80/JEUC/api/uc/ucUserWeb/saveMessForOnePersion",
	               data: fd,
                   headers: {'Content-Type':undefined},
	               transformRequest: angular.identity 
	               }).success( function ( res ){
                    console.log(res)
	                   if(res.ret=="200"){
                           alert("提交成功")
                       }else if(res.message=="原始密码校验失败!"){
                           $scope.same=4
                       }else{
                           alert(res.message);
                       }
	           })
            }
             
        }
        
}])
$(function(){
    $("#file").change(function(e){
            var f=document.getElementById('file').files[0];
            var src = window.URL.createObjectURL(f);
        console.log(src)
            document.getElementById('preview').src = src;
    });
})