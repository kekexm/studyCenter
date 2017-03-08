app.controller('studentHandleCtrl',['$scope','$state','$timeout','loginService',function($scope,$state,$timeout,loginService) {
    $scope.state = {
        headTab:0,//判断头部选项卡
        gradeState:"all",//判断年级
        classState:'all',//判断班级
        studentOnlineChecked:false,//在线学生-判断是否选中
        studentStopChecked:false,//停用账号-判断是否选中
        studentRecoverChecked:false,//回收站-判断是否选中
        studentOnlineCount:0,//学生人数
        warningShow:false
    }
    $scope.state.headTab = sessionStorage.getItem('tableChange') || 0;
    //模拟数据
     $scope.studentList = {
        checkboxArr : [],
        checkboxStopArr:[],
        checkboxReArr:[],
        gradeList:[
        ],
        classList:[
            {className:'全部',classId:'all'}
        ],
        tableMsgList:[
        ],
        tableMsgListStop:[
        ],
        tableMsgListRecover:[
        ]
    }
    //点击头部选项卡
    $scope.changeTab = function(state) {
        sessionStorage.setItem('tableChange',state);
        $scope.state.headTab = state;
        // $state.go('teacher_index.student_handle',{tableChange:state})
    }
    //进入页面加载请求年级和班级
    var schoolId = {
        oid:JSON.parse(sessionStorage.getItem('userObj')).oid
    }
    //在线学生请求班级数据
    
    loginService.studentHandleGradeList(schoolId,function(res){
        $scope.state.gradeState = res.data[0].gradeId;
        $scope.studentList.gradeList = $scope.studentList.gradeList.concat(res.data);
        //通过年级id获取班级信息
        loginService.studentHandleClassList({gid:$scope.state.gradeState},function(res){
            $scope.state.classState = res.data[0].classId;
            $scope.studentList.classList = $scope.studentList.classList.concat(res.data);
            loginService.studentHandleUserList({
                oid : schoolId.oid,
                gid : $scope.state.gradeState,
                cid : res.data[0].classId,
                delflag:0,
                pageNo : 1,
                pageSize : 15
            },function(res){
                if(res.ret==200){
                    $scope.studentList.tableMsgList = res.data;
                    $scope.studentPaginationOnline.totalItems = $scope.studentList.tableMsgList.length;
                    $scope.state.studentOnlineCount = $scope.studentList.tableMsgList.length;
                }else if(res.ret==400){
                    $scope.state.noteContent = '该班级没有学生';
                    $scope.state.warningShow = true;
                    $scope.studentList.tableMsgList = [];
                    $scope.state.studentOnlineCount = 0;
                    $scope.studentPaginationOnline.totalItems = 0;
                    $timeout(function(){
                        $scope.state.warningShow = false;
                    },500)
                }
                
            },function(e){
                console.log(e)
            });
            //学生停用账号
            loginService.studentHandleUserList({
                oid : schoolId.oid,
                gid : $scope.state.gradeState,
                cid : res.data[0].classId,
                delflag:2,
                pageNo : 1,
                pageSize : 15
            },function(res){
                if(res.ret==200){
                    $scope.studentList.tableMsgListStop = res.data;
                    $scope.studentPaginationStop.totalItems = $scope.studentList.tableMsgListStop.length;
                    $scope.state.studentStopCount = $scope.studentList.tableMsgListStop.length;
                }else if(res.ret==400){
                    $scope.state.noteContent = '该班级没有学生';
                    $scope.state.warningShow = true;
                    $scope.studentList.tableMsgListStop = [];
                    $scope.state.studentStopCount = 0;
                    $scope.studentPaginationStop.totalItems = 0;
                    $timeout(function(){
                        $scope.state.warningShow = false;
                    },500)
                }
            },function(e){
                console.log(e)
            });
            //学生回收账号
            loginService.studentHandleUserList({
                oid : schoolId.oid,
                gid : $scope.state.gradeState,
                cid : res.data[0].classId,
                delflag:3,
                pageNo : 1,
                pageSize : 15
            },function(res){
                if(res.ret==200){
                    $scope.studentList.tableMsgListRecover = res.data;
                    $scope.studentPaginationRecover.totalItems = $scope.studentList.tableMsgListRecover.length;
                    $scope.state.studentRecoverCount = $scope.studentList.tableMsgListRecover.length;
                }else if(res.ret==400){
                    $scope.state.noteContent = '该班级没有学生';
                    $scope.state.warningShow = true;
                    $scope.studentList.tableMsgListRecover = [];
                    $scope.state.studentRecoverCount = 0;
                    $scope.studentPaginationRecover.totalItems = 0;
                    $timeout(function(){
                        $scope.state.warningShow = false;
                    },500)
                }
            },function(e){
                console.log(e)
            });
        },function(e){
            console.log(e)
        })
    },function(e){
        console.log(e)
    });
    //点击在线学生全选
    $scope.onlineCheckAction = function(event) {
        if($scope.state.studentOnlineChecked){
            $scope.studentList.checkboxArr = [];
            $scope.studentList.tableMsgList.forEach(function(v) {
                $scope.studentList.checkboxArr.push(v.stuId)
            })
        }else{
             $scope.studentList.checkboxArr=  [];
        }
    }
    //点击停用学生全选
    $scope.stopCheckAction = function(event) {
        if($scope.state.studentStopChecked){
            $scope.studentList.checkboxStopArr = [];
            $scope.studentList.tableMsgListStop.forEach(function(v) {
                $scope.studentList.checkboxStopArr.push(v.stuId)
            })
        }else{
             $scope.studentList.checkboxStopArr=  [];
        }
    }
     //点击回收站全选
    $scope.recoverCheckAction = function(event) {
        if($scope.state.studentRecoverChecked){
            $scope.studentList.checkboxReArr = [];
            $scope.studentList.tableMsgListRecover.forEach(function(v) {
                $scope.studentList.checkboxReArr.push(v.stuId)
            })
        }else{
             $scope.studentList.checkboxReArr=  [];
        }
    }
    //学生在线单选的选中状态
    $scope.isChecked = function(id) {
        return  $scope.studentList.checkboxArr.indexOf(id)>=0
    }
    //停用账号单选的选中状态
    $scope.isCheckedStop = function(id) {
        return  $scope.studentList.checkboxStopArr.indexOf(id)>=0
    }
    //回收站单选的选中状态
    $scope.isCheckedRe = function(id) {
        return  $scope.studentList.checkboxReArr.indexOf(id)>=0
    }
     //学生在线点击单个checkbox
    $scope.changeOnlineCheck = function(event,id) {
        var action = event.target.checked?'add':'remove';
        if(action=='add'&&$scope.studentList.checkboxArr.indexOf(id)==-1){
            $scope.studentList.checkboxArr.push(id);
            if($scope.studentList.checkboxArr.length==$scope.studentList.tableMsgList.length){
                $scope.state.studentOnlineChecked = true
            }
        }
        if(action=='remove'&&$scope.studentList.checkboxArr.indexOf(id)!=-1){
            var inx = $scope.studentList.checkboxArr.indexOf(id);
            $scope.studentList.checkboxArr.splice(inx,1);
            $scope.state.studentOnlineChecked = false
        }
    }
      //帐号停用点击单个checkbox
    $scope.changeStopCheck = function(event,id) {
        var action = event.target.checked?'add':'remove';
        if(action=='add'&&$scope.studentList.checkboxStopArr.indexOf(id)==-1){
            $scope.studentList.checkboxStopArr.push(id);
            if($scope.studentList.checkboxStopArr.length==$scope.studentList.tableMsgListStop.length){
                $scope.state.studentStopChecked = true
            }
        }
        if(action=='remove'&&$scope.studentList.checkboxStopArr.indexOf(id)!=-1){
            var inx = $scope.studentList.checkboxStopArr.indexOf(id);
            $scope.studentList.checkboxStopArr.splice(inx,1);
            $scope.state.studentStopChecked = false
        }
    }
      //回收站点击单个checkbox
    $scope.changeRecoverCheck = function(event,id) {
        var action = event.target.checked?'add':'remove';
        if(action=='add'&&$scope.studentList.checkboxReArr.indexOf(id)==-1){
            $scope.studentList.checkboxReArr.push(id);
            if($scope.studentList.checkboxReArr.length==$scope.studentList.tableMsgListRecover.length-1){
                $scope.state.studentRecoverChecked = true
            }
        }
        if(action=='remove'&&$scope.studentList.checkboxReArr.indexOf(id)!=-1){
            var inx = $scope.studentList.checkboxReArr.indexOf(id);
            $scope.studentList.checkboxReArr.splice(inx,1);
            $scope.state.studentRecoverChecked = false
        }
    }
    //点击年级
    $scope.changeGreade = function(gradeId){
        $scope.state.gradeState = gradeId;
        loginService.studentHandleClassList({gid:gradeId},function(res){
            $scope.state.classState = res.data[0].classId;
            $scope.studentList.classList  = [{className:'全部',classId:'all'}];
            $scope.studentList.classList = $scope.studentList.classList.concat(res.data);
            loginService.studentHandleUserList({
                oid : schoolId.oid,
                gid : $scope.state.gradeState,
                cid : res.data[0].classId,
                delflag:0,
                pageNo : 1,
                pageSize : 15
            },function(res){
                if(res.ret==200){
                    $scope.studentList.tableMsgList = res.data;
                    $scope.studentPaginationOnline.totalItems = $scope.studentList.tableMsgList.length;
                    $scope.state.studentOnlineCount = $scope.studentList.tableMsgList.length;
                }else if(res.ret==400){
                    $scope.state.noteContent = '该班级没有学生';
                    $scope.state.warningShow = true;
                    $scope.studentList.tableMsgList = [];
                    $scope.state.studentOnlineCount = 0;
                    $scope.studentPaginationOnline.totalItems = 0;
                    $timeout(function(){
                        $scope.state.warningShow = false;
                    },500)
                }
                
            },function(e){
                console.log(e)
            });
        },function(e){
            console.log(e)
        })
    };
    //点击班级
     $scope.changeClass = function(classId){
        $scope.state.classState = classId;
        var objOnline = {
            oid : schoolId.oid,
            gid : $scope.state.gradeState,
            cid : classId,
            delflag : 0,
            pageNo : 1,
            pageSize : 15
        }
        var objStop = {
            oid : schoolId.oid,
            gid : $scope.state.gradeState,
            cid : classId,
            delflag : 2,
            pageNo : 1,
            pageSize : 15
        }
        var objRecover = {
            oid : schoolId.oid,
            gid : $scope.state.gradeState,
            cid : classId,
            delflag : 3,
            pageNo : 1,
            pageSize : 15
        }
        if(classId=='all'){
            objOnline = {
                oid : schoolId.oid,
                gid : $scope.state.gradeState,
                delflag : 0,
                pageNo : 1,
                pageSize : 15
            }
            objStop = {
                oid : schoolId.oid,
                gid : $scope.state.gradeState,
                delflag : 2,
                pageNo : 1,
                pageSize : 15
            }
            objRecover = {
                oid : schoolId.oid,
                gid : $scope.state.gradeState,
                delflag : 3,
                pageNo : 1,
                pageSize : 15
            }
            $scope.state.warningShow = true;
            $scope.state.noteContent = '稍等一会';
        }
        // 学生在线
        loginService.studentHandleUserList(objOnline,function(res){
            if(res.ret==200){
                $scope.state.warningShow = false;
                $scope.studentList.tableMsgList = res.data;
                $scope.studentPaginationOnline.totalItems = $scope.studentList.tableMsgList.length;
                $scope.state.studentOnlineCount = $scope.studentList.tableMsgList.length;
            }else if(res.ret==400){
                $scope.studentList.tableMsgList = [];
                $scope.state.studentOnlineCount = 0;
                $scope.studentPaginationOnline.totalItems = 0;
            }
        },function(e){
            $scope.state.warningShow = true;
            $scope.state.noteContent = '服务器错误请刷新页面重试';
            console.log(e)
        });
        //停用
        loginService.studentHandleUserList(objStop,function(res){
            if(res.ret==200){
                // $scope.state.warningShow = false;
                $scope.studentList.tableMsgListStop = res.data;
                $scope.studentPaginationStop.totalItems = $scope.studentList.tableMsgListStop.length;
                $scope.state.studentStopCount = $scope.studentList.tableMsgListStop.length;
            }else if(res.ret==400){
                $scope.studentList.tableMsgListStop = [];
                $scope.state.studentStopCount = 0;
                $scope.studentPaginationStop.totalItems = 0;
            }
        },function(e){
            $scope.state.warningShow = true;
            $scope.state.noteContent = '服务器错误请刷新页面重试';
            console.log(e)
        });
        //回收站
        loginService.studentHandleUserList(objRecover,function(res){
            if(res.ret==200){
                $scope.studentList.tableMsgListRecover = res.data;
                $scope.studentPaginationRecover.totalItems = $scope.studentList.tableMsgListRecover.length;
                $scope.state.studentRecoverCount = $scope.studentList.tableMsgListRecover.length;
            }else if(res.ret==400){
                $scope.studentList.tableMsgListRecover = [];
                $scope.state.studentRecoverCount = 0;
                $scope.studentPaginationRecover.totalItems = 0;
            }
        },function(e){
            $scope.state.warningShow = true;
            $scope.state.noteContent = '服务器错误请刷新页面重试';
            console.log(e)
        });
    }
    $scope.studentOnlineAction = function(stateAction){
        switch(stateAction){
            case 'stop':
                var params = {
                    ids : $scope.studentList.checkboxArr.join(','),
                    delFlag : 2
                }
                loginService.teachHandleUpdataList(params,function(res){
                    if(res.ret==200){
                        $scope.state.warningShow = true;
                        $scope.state.noteContent = '用户已停用';
                    }
                    $timeout(function(){
                        $scope.state.warningShow = false;
                        
                    },500)

                },function(e){
                    console.log(e)
                })
            break;

        }
    }
    //=学生在线分页组件配置
    $scope.studentPaginationOnline = {
        currentPage: 1,
        totalItems: 1,
        pagesLength: 9,
        perPageOptions: [15],
        onChange:function() {
            
        }
    }
    //账号停用分页组件配置
    $scope.studentPaginationStop = {
        currentPage: 1,
        totalItems: 1,
        pagesLength: 9,
        perPageOptions: [15],
        onChange:function() {
            
        }
    }
    //回收分页组件配置
    $scope.studentPaginationRecover = {
        currentPage: 1,
        totalItems: 220,
        pagesLength: 9,
        perPageOptions: [15],
        onChange:function() {
            
        }
    }
}])