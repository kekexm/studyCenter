app.controller("mUpdataParentCtrl",['$scope','$http',function($scope,$http){
        //添加授课单选默认值
        
    
        //在sessio中取值
//        $scope.user={}
//        $scope.user.id = sessionStorage.getItem('userId') ;
//        $scope.user.userType = sessionStorage.getItem('userType') ;
//    
        $http.post('http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findPersonalInfoByUid',{uid :50000,userType :3}).success(function(res){
            $scope.user=res
        })
    
      
        $http.get('file/nation.json').success(function(res){
            $scope.nationData=res.data
        })
   
        
        $scope.xgjzxx=function(){

//            //在sessio中取值
//            $scope.uid = sessionStorage.getItem('userId');
//            
            //获取新的数据
            $scope.userObj={
                "uid":"50000",
                "realname":$scope.user.data.realname,
                "sex":$scope.user.data.sex,
                "userNation":$scope.user.data.user_nation,
                "userMobile":$scope.user.data.user_mobile,
                "userEmail":$scope.user.data.user_email
            }
            
          $http.post("http://192.168.9.98:80/JEUC/api/uc/UcStuManagement/updateParents",$scope.userObj).success(function(res){
                $(".zy_warningBox").show();
                setTimeout(function(){
                        $(".zy_warningBox").hide();
                        window.location.reload()
                    },1000)
                
            })
        }

        //根据家长UID查出子女信息
        $http.post("http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findChildrenByParentId",{uid:50000}).success(function(res){
            $scope.zinvxx=res;
        })
        
        $scope.wx_erro=true
        
        $scope.sjpat=function(){
            if($scope.user.data.user_mobile==""){
                $scope.wx_erro=false
            }
        }
     
    }])