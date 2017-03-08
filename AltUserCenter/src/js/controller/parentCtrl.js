app.controller('parentCtrl',['$scope','$http',function($scope,$http) {
    $scope.switch=0;
    $scope.zinvshow=0;
    $scope.tab=function(n){
        $scope.switch=n
    }
        
    $scope.zinvtab=function(n){
        $scope.zinvshow=n
    }
    //定义user对象
    $scope.user = {};
    //定义会显得user对象
    $scope.huixianuser = {};
    //定义民族
   	$scope.nationData = {};
    
    //定义子女数组
    $scope.znlist=[];
    
    
    //定义父母数组
    $scope.parents=[
        {
            "id": "女", 
            "name": "母亲"
        }, 
        {
            "id": "男", 
            "name": "父亲"
        }, 
    ];
    
    //定义查询的家长对象
    $scope.userObj={
        user_nation:"",
        uid:"",
        user_email:"",
        user_mobile:"",
        sex:"",
        state:"",
        stuName:"",
        stuNo:"",
        realname:"",
        id:"",
        userType:"" 
    };
    
    //民族下拉列表,访问静态文件
 	$http.get("file/nation.json").success(function(data) {
 		$scope.nationData = data.data;
        
        console.log($scope.nationData);
 	});
    
    
    //从session中获取参数
    $scope.user.id = sessionStorage.getItem('userId') ;
   	$scope.user.userType = sessionStorage.getItem('userType') ;
    
    
    
    //通过id查询用户信息
   	$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findPersonalInfoByUid",{uid : $scope.user.id,userType :         $scope.user.userType}).success(function(data) {
        
       
        $scope.user = data.data;
        
        $scope.userObj.id=sessionStorage.getItem('userId');
        $scope.userObj.realname=$scope.user.realname;
        $scope.userObj.sex=$scope.user.sex;
        $scope.userObj.state=$scope.user.state;
        $scope.userObj.stuName=$scope.user.stuName;
        $scope.userObj.stuNo=$scope.user.stuNo;
        $scope.userObj.uid=$scope.user.uid;
        $scope.userObj.userType=sessionStorage.getItem('userType') ;
        $scope.userObj.user_nation=$scope.user.user_nation;
        $scope.userObj.user_mobile=$scope.user.user_mobile;
        $scope.userObj.user_email=$scope.user.user_email;
        
        
        
 	});
    
    
     //页面加载子女信息
   	$http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findChildrenByParentId",{uid : "50000"}).success(function(data) {
  
 		$scope.znlist=data.data.parentChildren;
        console.log("zinv");
        console.log(data.data);
        angular.forEach($scope.znlist,function(p){
             var keepGoing = true;
             angular.forEach($scope.nationData,function(data){
                if(keepGoing){
                    if(data.id==p.userNation){
                        p.userNation = data.name;
                        keepGoing = false;
                    }
                }
                 
            });
        }); 
 	});

 
        
        //家长点击个人信息的提交
		$scope.submitDataParent = function(){
            
            $scope.user.id = sessionStorage.getItem('userId') ;
            $scope.user.userType = sessionStorage.getItem('userType') ;
           /* alert($scope.user.id);
            alert($scope.user.realname);
            alert($scope.user.user_nation);
            alert($scope.user.sex);*/
            if($scope.user.realname==""){
                alert("请填写姓名在提交！");
                return;
            }
            
            //alert($scope.userObj.sex);
           
            //alert($scope.user.sex);
            
            /*console.log($scope.userObj);
            
            console.log($scope.user);*/
             console.log(JSON.stringify($scope.userObj));
             console.log(JSON.stringify($scope.user));
            if(JSON.stringify($scope.userObj)==JSON.stringify($scope.user)){
                alert("请操作后再提交");
            }else{
                $http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/saveUserInfo",{uid:$scope.user.id,realname:$scope.user.realname,sex:$scope.user.sex,userNation:$scope.user.user_nation,userType: $scope.user.userType,userPhone:$scope.user.user_mobile,userEmail:$scope.user.user_email}).success(function(data) {
               if(data.ret=="200"){
                  $(".zy_warningBox").show();
                    setTimeout(function(){
                            $(".zy_warningBox").hide();
                    },1000);
                    location.reload();
                    
               }else{
                   alert("提交失败");
               }
                console.log(data);
 	        });
            }
           
		} 
        
        //家长账号设置提交
        
        //图片上传
        $scope.upload = function(){
                var fd = new FormData();
                var file = document.querySelector('input[type=file]').files[0];
                fd.append('filename', file);
                fd.append("id",$scope.user.uid);
                console.log(fd.get('filename'));
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
                fd.append("id",$scope.user.uid);
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
                           $(".zy_warningBox").show();
                            setTimeout(function(){
                            $(".zy_warningBox").hide();
                        },1000)
                       }else if(res.message=="原始密码校验失败!"){
                           $scope.same=4
                       }else{
                           alert(res.message);
                       }
	           })
            }
             
        }
        
        
         //子女信息提交
        $scope.zvsubmit = function(){
            //定义子女提交对象
            $scope.paramArray = [];
           
            $scope.zvparam={};
    
            angular.forEach($scope.znlist,function(p){
                var b = {};
                b.sex = p.sex;
                b.parentId = p.parentId;
                b.stuId = p.stuId;
                b.relation_id = p.relation_id;
                $scope.paramArray.push(b);
                
            });
            $scope.zvparam.parentChildren=$scope.paramArray;
           /* console.log($scope.paramArray);
            console.log($scope.zvparam);
            console.log(angular.toJson($scope.zvparam));*/
            $http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/updateChildrenInfo",{param: angular.toJson($scope.zvparam)}).success(function(data) {
                console.log(data);
                if(data.ret=="200"){
                    $(".zy_warningBox").show();
                        setTimeout(function(){
                            $(".zy_warningBox").hide();
                    },1000)
                }else{
                    alert("提交失败");
                }
                
 	        });
        }
       
        
    
    

}]);
    $(function(){
        $("#file").change(function(e){
                var f=document.getElementById('file').files[0];
                var src = window.URL.createObjectURL(f);
            console.log(src)
                document.getElementById('preview').src = src;
        });
    })