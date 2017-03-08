app.controller('parentsHandleCtrl',['$scope',function($scope) {
    $scope.state = {
        headTab:0,//判断头部选项卡
        gradeState:0,//判断年级
        classState:0,//判断班级
        allchecked:false,//家长注册-判断是否选中
        allcheckedRecover:false//回收-判断是否选中
    }
    //点击注册家长全选
    $scope.clickallCheck = function(event) {
        if($scope.state.allchecked){
            $scope.parentsList.checkboxArr = [];
            $scope.parentsList.tableMsgList.forEach(function(v) {
                $scope.parentsList.checkboxArr.push(v.id)
            })
        }else{
             $scope.parentsList.checkboxArr=  [];
        }
    }
    //点击回收站全选
    $scope.clickRecoverCheck = function(event) {
        if($scope.state.allcheckedRecover){
            $scope.parentsList.checkboxReArr = [];
            $scope.parentsList.tableMsgListRecover.forEach(function(v) {
                $scope.parentsList.checkboxReArr.push(v.id)
            })
        }else{
             $scope.parentsList.checkboxReArr=  [];
        }
    }
    //家长注册单选的选中状态
    $scope.isChecked = function(id) {
        return  $scope.parentsList.checkboxArr.indexOf(id)>=0
    }
    //回收站单选的选中状态
    $scope.isCheckedRecover = function(id) {
        return  $scope.parentsList.checkboxReArr.indexOf(id)>=0
    }
    //家长注册点击单个checkbox
    $scope.changeCheckbox = function(event,id) {
        var action = event.target.checked?'add':'remove';
        if(action=='add'&&$scope.parentsList.checkboxArr.indexOf(id)==-1){
            $scope.parentsList.checkboxArr.push(id);
            if($scope.parentsList.checkboxArr.length==4){
                $scope.state.allchecked = true
            }
        }
        if(action=='remove'&&$scope.parentsList.checkboxArr.indexOf(id)!=-1){
            var inx = $scope.parentsList.checkboxArr.indexOf(id);
            $scope.parentsList.checkboxArr.splice(inx,1);
            $scope.state.allchecked = false
        }
    }
    //回收站点击单个checkbox
    $scope.changeRecoverCheckbox = function(event,id) {
        var action = event.target.checked?'add':'remove';
        if(action=='add'&&$scope.parentsList.checkboxReArr.indexOf(id)==-1){
            $scope.parentsList.checkboxReArr.push(id);
            if($scope.parentsList.checkboxReArr.length==4){
                $scope.state.allcheckedRecover = true
            }
        }
        if(action=='remove'&&$scope.parentsList.checkboxReArr.indexOf(id)!=-1){
            var inx = $scope.parentsList.checkboxReArr.indexOf(id);
            $scope.parentsList.checkboxReArr.splice(inx,1);
            $scope.state.allcheckedRecover = false;
        }
    }
    $scope.parentsList = {
        checkboxArr : [],
        checkboxReArr:[],
        gradeList:[
            {grade:'小学一年级'},
            {grade:'小学一年级'},
            {grade:'小学一年级'},
            {grade:'小学一年级'},
            {grade:'小学一年级'},
        ],
        classList:[
            {classitem:'一班'},
            {classitem:'一班'},
            {classitem:'一班'},
            {classitem:'一班'},
        ],
        tableMsgList:[
            {id:'sss1',name:'张三',phone:'123456789',email:'369452154@qq.com',childrenname:'张佳佳',recordnum:'534535'},
            {id:'sss2',name:'李斯',phone:'4657564',email:'324@qq.com',childrenname:'张佳佳',recordnum:'5675675'},
            {id:'sss3',name:'王五',phone:'123123',email:'2sdf@qq.com',childrenname:'张佳佳',recordnum:'123asd'},
            {id:'sss4',name:'找刘',phone:'345435',email:'56756sdf@qq.com',childrenname:'张佳佳',recordnum:'hjkhj678'}
        ],
        tableMsgListRecover:[
            {id:'sss1',name:'张五',phone:'123456789',email:'369452154@qq.com',childrenname:'张佳佳',recordnum:'534535'},
            {id:'sss2',name:'马六',phone:'4657564',email:'324@qq.com',childrenname:'张佳佳',recordnum:'5675675'},
            {id:'sss3',name:'赵琦',phone:'123123',email:'2sdf@qq.com',childrenname:'张佳佳',recordnum:'123asd'},
            {id:'sss4',name:'胡八',phone:'345435',email:'56756sdf@qq.com',childrenname:'张佳佳',recordnum:'hjkhj678'}
        ]
    }
    $scope.changeGreade = function(index){
        $scope.state.gradeState = index
    }
     $scope.changeClass = function(index){
        $scope.state.classState = index
    }
    //分页组件配置
    $scope.parentPaginationLogin = {
        currentPage: 1,
        totalItems: 220,
        pagesLength: 9,
        perPageOptions: [15],
        onChange:function() {
            // if(this.currentPage==1){
            //     return false
            // }
            console.log(this.currentPage)
        }
    }
    //回收站分页
    $scope.parentPaginationRecover = {
        currentPage: 1,
        totalItems: 180,
        pagesLength: 9,
        perPageOptions: [15],
        onChange:function() {
            
        }
    }
}]);
