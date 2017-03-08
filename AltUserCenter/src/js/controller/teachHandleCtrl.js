app.controller('teachHandleCtrl', ['$scope', 'loginService','$state', '$stateParams','$timeout',function ($scope, loginService,$state,$stateParams,$timeout) {
    //各种状态判断
    $scope.state = {
        headTab: 0,//判断头部选项卡
        teachOnlineChecked: false,//在线教师-判断是否选中
        teachStopChecked: false,//停用账号-判断是否选中
        teachRecoverChecked: false,//回收站-判断是否选中
        teachOnlineCount: 0,
        teachStopCount: 0,
        teachRecoverCount: 0,
        warningShow: false,
        noteContent:'',
        testShow:1
    }
    if($stateParams.tableChange){
        $scope.state.headTab = $stateParams.tableChange;
    }
    //在线教师分页
    $scope.teachPaginationOnline = {
        currentPage: 1,
        totalItems: 10,
        pagesLength: 9,
        perPageOptions: [15],
        onChange: function () {

        }
    }
    //停用账号分页
    $scope.teachPaginationStop = {
        currentPage: 1,
        totalItems: 10,
        pagesLength: 9,
        perPageOptions: [15],
        onChange: function () {

        }
    }
    //回收分页
    $scope.teachPaginationRecover = {
        currentPage: 1,
        totalItems: 10,
        pagesLength: 9,
        perPageOptions: [15],
        onChange: function () {

        }
    }
    //模拟数据
    $scope.teacherList = {
        teachOnlineArr: [],
        teachStopArr: [],
        teachRecoverArr: [],
        tableMsgList: [
        ],
        tableMsgListStop: [
        ],
        tableMsgListRecover: [
        ]
    }
    var userListParame = {
        userType: sessionStorage.getItem('userType'),//用户类型
        orderType: 1,//正序倒序
        // state:'',//审核、未审核
        delFlag: $stateParams.tableChange,//在职、删除、停用、回收
        pageSize: 15,
        pageNo: 1,
        oid: JSON.parse(sessionStorage.getItem('userObj')).oid//学校id
    }
    
    if($stateParams.tableChange==0){
        loginService.teachHandleUserList(userListParame, function (res) {
            $scope.teacherList.tableMsgList = res.data.list;
            $scope.state.teachOnlineCount = res.data.count;
            $scope.teachPaginationOnline.totalItems = res.data.count;
            console.log($scope.teacherList.tableMsgList)
        }, function (e) {
            console.log(e)
        });
    }
    if($stateParams.tableChange==2){
        loginService.teachHandleUserList(userListParame, function (res) {
            $scope.teacherList.tableMsgListStop = res.data.list;
            $scope.state.teachStopCount = res.data.count;
            $scope.teachPaginationStop.totalItems = res.data.count;
        }, function (e) {
            console.log(e)
        });
    }
     if($stateParams.tableChange==3){
         loginService.teachHandleUserList(userListParame, function (res) {
            $scope.teacherList.tableMsgListRecover = res.data.list;
            $scope.state.teachRecoverCount = res.data.count;
            $scope.teachPaginationRecover.totalItems = res.data.count;
        }, function (e) {
            console.log(e)
        });
    }
    $scope.changeHeadTab = function (tebState) {
        $scope.state.headTab = tebState;
        $state.go('teacher_index.teach_handle',{'tableChange':tebState})
    }
    
    /*var userListParame1 = {
        userType: sessionStorage.getItem('userType'),//用户类型
        orderType: 1,//正序倒序
        // state:'',//审核、未审核
        delFlag: 0,//在职、删除、停用、回收
        pageSize: 15,
        pageNo: 1,
        oid: JSON.parse(sessionStorage.getItem('userObj')).oid//学校id
    }
        //进入页面请求用户列表
    loginService.teachHandleUserList(userListParame1, function (res) {
        $scope.teacherList.tableMsgList = res.data.list;
        $scope.state.teachOnlineCount = res.data.count;
        $scope.teachPaginationOnline.totalItems = res.data.count;
        console.log($scope.teacherList.tableMsgList)
    }, function (e) {
        console.log(e)
    })*/
    
    //点击在线全选事件
    $scope.teachOnlineAction = function (event) {
        var state = $scope.state.teachOnlineChecked,
            arrList = $scope.teacherList.tableMsgList;
        if (state) {
            $scope.teacherList.teachOnlineArr = [];
            arrList.forEach(function (v) {
                $scope.teacherList.teachOnlineArr.push(v.id)
            })
        } else {
            $scope.teacherList.teachOnlineArr = [];
        }
    }
    //点击账号停用全选事件
    $scope.teachStopAction = function (event) {
        var state = $scope.state.teachStopChecked,
            arrList = $scope.teacherList.tableMsgListStop;
        if (state) {
            $scope.teacherList.teachStopArr = [];
            arrList.forEach(function (v) {
                $scope.teacherList.teachStopArr.push(v.id)
            })
        } else {
            $scope.teacherList.teachStopArr = [];
        }
    }
    //点击回收全选事件
    $scope.teachRecoverAction = function (event) {
        var state = $scope.state.teachRecoverChecked,
            arrList = $scope.teacherList.tableMsgListRecover;
        if (state) {
            $scope.teacherList.teachRecoverArr = [];
            arrList.forEach(function (v) {
                $scope.teacherList.teachRecoverArr.push(v.id)
            })
        } else {
            $scope.teacherList.teachRecoverArr = [];
        }
    }
    //在线教师单选的选中状态
    $scope.isOnlineChecked = function (id) {
        return $scope.teacherList.teachOnlineArr.indexOf(id) >= 0
    }
    //停用账号单选的选中状态
    $scope.isStopChecked = function (id) {
        return $scope.teacherList.teachStopArr.indexOf(id) >= 0
    } //回收单选的选中状态
    $scope.isRecovereChecked = function (id) {
        return $scope.teacherList.teachRecoverArr.indexOf(id) >= 0
    }
    //在线教师点击单个checkbox
    $scope.changeOnlineChecked = function (event, id) {
        var action = event.target.checked ? 'add' : 'remove';
        if (action == 'add' && $scope.teacherList.teachOnlineArr.indexOf(id) == -1) {
            $scope.teacherList.teachOnlineArr.push(id);
            if ($scope.teacherList.teachOnlineArr.length == $scope.teacherList.tableMsgList.length) {
                $scope.state.teachOnlineChecked = true
            }
        }
        if (action == 'remove' && $scope.teacherList.teachOnlineArr.indexOf(id) != -1) {
            var inx = $scope.teacherList.teachOnlineArr.indexOf(id);
            $scope.teacherList.teachOnlineArr.splice(inx, 1);
            $scope.state.teachOnlineChecked = false
        }
    }
    //停用账号点击单个checkbox
    $scope.changeStopChecked = function (event, id) {
        var action = event.target.checked ? 'add' : 'remove';
        if (action == 'add' && $scope.teacherList.teachStopArr.indexOf(id) == -1) {
            $scope.teacherList.teachStopArr.push(id);
            if ($scope.teacherList.teachStopArr.length == $scope.teacherList.tableMsgListStop.length) {
                $scope.state.teachStopChecked = true
            }
        }
        if (action == 'remove' && $scope.teacherList.teachStopArr.indexOf(id) != -1) {
            var inx = $scope.teacherList.teachStopArr.indexOf(id);
            $scope.teacherList.teachStopArr.splice(inx, 1);
            $scope.state.teachStopChecked = false
        }
    }
    //回收点击单个checkbox
    $scope.changeRecoverChecked = function (event, id) {
        var action = event.target.checked ? 'add' : 'remove';
        if (action == 'add' && $scope.teacherList.teachRecoverArr.indexOf(id) == -1) {
            $scope.teacherList.teachRecoverArr.push(id);
            if ($scope.teacherList.teachRecoverArr.length == $scope.teacherList.tableMsgListRecover.length) {
                $scope.state.teachRecoverChecked = true
            }
        }
        if (action == 'remove' && $scope.teacherList.teachRecoverArr.indexOf(id) != -1) {
            var inx = $scope.teacherList.teachRecoverArr.indexOf(id);
            $scope.teacherList.teachRecoverArr.splice(inx, 1);
            $scope.state.teachRecoverChecked = false
        }
    }
    //在线教师点击
    $scope.teachEventHandle = function(changeState) {
        if(!$scope.teacherList.teachOnlineArr.length){
            $scope.state.noteContent = '请选择选项';
                $scope.state.warningShow = true;
                $timeout(function(){
                    $scope.state.warningShow = false;
                },1000)
            return false
        }
        switch(changeState){
            case 'check':
                var objParames = {
                    ids : $scope.teacherList.teachOnlineArr.join(','),
                    state : 1,
                    delFlag : ''
                }
                loginService.teachHandleUpdataList(objParames,function(res){
                    if(res.ret == 200){
                        $scope.state.noteContent = '审核成功';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }
                },function(e){
                    console.log(e)
                });
            break;
            case 'stop':
                var objParames = {
                    ids : $scope.teacherList.teachOnlineArr.join(','),
                    state : '',
                    delFlag : 2
                }
                loginService.teachHandleUpdataList(objParames,function(res){
                    if(res.ret == 200){
                    $scope.state.noteContent = '停用成功';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }
                },function(e){
                    console.log(e)
                });
            break;
            //密码重置
            case 'passReset':
                var objParames = {
                    ids : $scope.teacherList.teachOnlineArr.join(','),
                    state : '',
                    delFlag : ''
                }
                loginService.teachHandleUpdataList(objParames,function(res){
                    if(res.ret == 200){
                    $scope.state.noteContent = '密码重置成功';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }
                },function(e){
                    console.log(e)
                });
            break;
            case 'delet':
                var objParames = {
                    ids : $scope.teacherList.teachOnlineArr.join(','),
                    state : '',
                    delFlag : 3
                }
                loginService.teachHandleUpdataList(objParames,function(res){
                    if(res.ret == 200){
                    $scope.state.noteContent = '用户已删除';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }
                },function(e){
                    console.log(e)
                });
            break;
            
         }
        
    }
    //搜索事件
    $scope.onlineSearch = function(keywords){
        var searchListParame = {
             userType: sessionStorage.getItem('userType'),//用户类型
            orderType: 1,//正序倒序
            // state:'',//审核、未审核
            keyword: keywords,
            delFlag: $stateParams.tableChange,//在职、删除、停用、回收
            pageSize: 15,
            pageNo: 1,
            oid: JSON.parse(sessionStorage.getItem('userObj')).oid//学校id
        }
        if($stateParams.tableChange==0){
            loginService.teachHandleUserList(searchListParame, function (res) {
                $scope.teacherList.tableMsgList = res.data.list;
                $scope.state.teachOnlineCount = res.data.count;
                $scope.teachPaginationOnline.totalItems = res.data.count;
            }, function (e) {
                console.log(e)
            });
        }else if($stateParams.tableChange==2){
            loginService.teachHandleUserList(userListParame, function (res) {
                $scope.teacherList.tableMsgListStop = res.data.list;
                $scope.state.teachStopCount = res.data.count;
                $scope.teachPaginationStop.totalItems = res.data.count;
            }, function (e) {
                console.log(e)
            });
        }else if($stateParams.tableChange==3){
            loginService.teachHandleUserList(userListParame, function (res) {
                $scope.teacherList.tableMsgListRecover = res.data.list;
                $scope.state.teachRecoverCount = res.data.count;
                $scope.teachPaginationRecover.totalItems = res.data.count;
            }, function (e) {
                console.log(e)
            });
        }
    }
    //教师在线搜索
    $scope.onlineKeyup = function(event,key) {
        if(event.keyCode==13){
            $scope.onlineSearch(key)
        }
    }


    // $scope.stopSearch = function(keyword){
    //      $scope.onlineSearch(keyword)
    // }
    // $scope.recoverSearch = function(keyword){
    //     console.log(keyword)
    // }
    //教师账号停用事件
    $scope.teachStopHandle = function(changeState) {
         if(!$scope.teacherList.teachStopArr.length){
            $scope.state.noteContent = '请选择选项';
                $scope.state.warningShow = true;
                $timeout(function(){
                    $scope.state.warningShow = false;
                },1000)
            return false
        }
        switch(changeState){
            case 'renew':
                var objParames = {
                    ids : $scope.teacherList.teachStopArr.join(','),
                    state : '',
                    delFlag : 0
                }
                loginService.teachHandleUpdataList(objParames,function(res){
                    if(res.ret == 200){
                    $scope.state.noteContent = '账号已可以重新使用';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }
                },function(e){
                    console.log(e)
                });
            break;
            case 'finishDele':
                var objParames = {
                    ids : $scope.teacherList.teachStopArr.join(','),
                    state : '',
                    delFlag : 1
                }
                loginService.teachHandleUpdataList(objParames,function(res){
                    if(res.ret == 200){
                    $scope.state.noteContent = '用户已彻底删除';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }
                },function(e){
                    console.log(e)
                });
            break;
        }
        
    }
    //教师回收事件
    $scope.teachRecoverHandle = function(changeState) {
         if(!$scope.teacherList.teachRecoverArr.length){
            $scope.state.noteContent = '请选择选项';
                $scope.state.warningShow = true;
                $timeout(function(){
                    $scope.state.warningShow = false;
                },1000)
            return false
        }
        switch(changeState){
            case 'startUser':
                var objParames = {
                    ids : $scope.teacherList.teachRecoverArr.join(','),
                    state : '',
                    delFlag : 0
                }
                loginService.teachHandleUpdataList(objParames,function(res){
                    if(res.ret == 200){
                    $scope.state.noteContent = '账号已可以重新使用';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }
                },function(e){
                    console.log(e)
                });
            break;
            case 'finishDele':
                var objParames = {
                    ids : $scope.teacherList.teachRecoverArr.join(','),
                    state : '',
                    delFlag : 1
                }
                loginService.teachHandleUpdataList(objParames,function(res){
                    if(res.ret == 200){
                    $scope.state.noteContent = '用户已彻底删除';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }else if(res.ret==500){
                        $scope.state.noteContent = '服务器异常';
                        $scope.state.warningShow = true;
                        $timeout(function(){
                            $scope.state.warningShow = false;
                            $state.go('teacher_index.teach_handle',null,{reload:true})
                        },1000)
                    }
                },function(e){
                    console.log(e)
                });
            break;
        }
    }
    
}])