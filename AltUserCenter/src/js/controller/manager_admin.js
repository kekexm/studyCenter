	/*app.config(["$provide", function($provide) {
		//日历汉化
		var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
		$provide.value("$locale", {
		  "DATETIME_FORMATS": {
		    "AMPMS": [
		      "\u4e0a\u5348",
		      "\u4e0b\u5348"
		    ],
		    "DAY": [
		      "\u661f\u671f\u65e5",
		      "\u661f\u671f\u4e00",
		      "\u661f\u671f\u4e8c",
		      "\u661f\u671f\u4e09",
		      "\u661f\u671f\u56db",
		      "\u661f\u671f\u4e94",
		      "\u661f\u671f\u516d"
		    ],
		    "ERANAMES": [
		      "\u516c\u5143\u524d",
		      "\u516c\u5143"
		    ],
		    "ERAS": [
		      "\u516c\u5143\u524d",
		      "\u516c\u5143"
		    ],
		    "FIRSTDAYOFWEEK": 6,
		    "MONTH": [
		      "\u4e00\u6708",
		      "\u4e8c\u6708",
		      "\u4e09\u6708",
		      "\u56db\u6708",
		      "\u4e94\u6708",
		      "\u516d\u6708",
		      "\u4e03\u6708",
		      "\u516b\u6708",
		      "\u4e5d\u6708",
		      "\u5341\u6708",
		      "\u5341\u4e00\u6708",
		      "\u5341\u4e8c\u6708"
		    ],
		    "SHORTDAY": [
		      "\u5468\u65e5",
		      "\u5468\u4e00",
		      "\u5468\u4e8c",
		      "\u5468\u4e09",
		      "\u5468\u56db",
		      "\u5468\u4e94",
		      "\u5468\u516d"
		    ],
		    "SHORTMONTH": [
		      "1\u6708",
		      "2\u6708",
		      "3\u6708",
		      "4\u6708",
		      "5\u6708",
		      "6\u6708",
		      "7\u6708",
		      "8\u6708",
		      "9\u6708",
		      "10\u6708",
		      "11\u6708",
		      "12\u6708"
		    ],
		    "STANDALONEMONTH": [
		      "\u4e00\u6708",
		      "\u4e8c\u6708",
		      "\u4e09\u6708",
		      "\u56db\u6708",
		      "\u4e94\u6708",
		      "\u516d\u6708",
		      "\u4e03\u6708",
		      "\u516b\u6708",
		      "\u4e5d\u6708",
		      "\u5341\u6708",
		      "\u5341\u4e00\u6708",
		      "\u5341\u4e8c\u6708"
		    ],
		    "WEEKENDRANGE": [
		      5,
		      6
		    ],
		    "fullDate": "y\u5e74M\u6708d\u65e5EEEE",
		    "longDate": "y\u5e74M\u6708d\u65e5",
		    "medium": "y\u5e74M\u6708d\u65e5 ah:mm:ss",
		    "mediumDate": "y\u5e74M\u6708d\u65e5",
		    "mediumTime": "ah:mm:ss",
		    "short": "y/M/d ah:mm",
		    "shortDate": "y/M/d",
		    "shortTime": "ah:mm"
		  },
		  "NUMBER_FORMATS": {
		    "CURRENCY_SYM": "\u00a5",
		    "DECIMAL_SEP": ".",
		    "GROUP_SEP": ",",
		    "PATTERNS": [
		      {
		        "gSize": 3,
		        "lgSize": 3,
		        "maxFrac": 3,
		        "minFrac": 0,
		        "minInt": 1,
		        "negPre": "-",
		        "negSuf": "",
		        "posPre": "",
		        "posSuf": ""
		      },
		      {
		        "gSize": 3,
		        "lgSize": 3,
		        "maxFrac": 2,
		        "minFrac": 2,
		        "minInt": 1,
		        "negPre": "-\u00a4",
		        "negSuf": "",
		        "posPre": "\u00a4",
		        "posSuf": ""
		      }
		    ]
		  },
		  "id": "zh",
		  "localeID": "zh",
		  "pluralCat": function(n, opt_precision) {  return PLURAL_CATEGORY.OTHER;}
		});
	}]);
	*/
	app.controller('managerSchoolCtr',['$scope','$timeout','$http',function($scope,$timeout,$http) {
		   
		 //日历
	    /*$scope.dicQueryObj = {
		    fileName: '',
		    startTime:new Date(),
		    endTime: new Date(),
		    order: '0'
		};
		//时间选择器配置
		// $scope.minStartDate = ''; //开始时间的最小时间
		// $scope.maxStartDate = $scope.dicQueryObj.endTime; //开始时间的最大可选时间
		// $scope.minEndDate = $scope.dicQueryObj.startTime; //结束时间的最小可选时间要大于开始时间的设定值
		// $scope.maxEndDate = $scope.dicQueryObj.endTime; //结束时间的最大可选择时间不超过结束时间的设定值
		
		$scope.$watch('dicQueryObj.startTime', function(v){
		    $scope.dicQueryObj.endTime = v;
		});
		// $scope.$watch('dicQueryObj.endTime', function(v){
		//     $scope.maxStartDate = v;
		// });
		$scope.dateOptions = {
		    formatYear: 'yy',
		    startingDay: 1
		};
		$scope.startOpen = function() {
		    $timeout(function() {
		        $scope.startPopupOpened = true;
		    });
		};
		$scope.endOpen = function() {
		    $timeout(function() {
		        $scope.endPopupOpened = true;
		    });
		};
		$scope.startPopupOpened = false;
		$scope.endPopupOpened = false;*/
	   
	   
	   
	    //获取学校地区
	    $scope.schoolArea = {};
	    
	    $http.post('http://192.168.9.98:80/JEUC/api/uc/PersonalInfo/findUserAreaByAreaId',{areaId : '5d3458f31f5e4cd498b1371cb42ae39a'}).success(function (data){
	   		console.log(data);
   			$scope.schoolArea = data.data;
   			
	    }).error(function (e){
	   	
	    });
	   
	    //获取学校基本信息
	    $scope.schoolDate = {};
	   
		$http.post('http://192.168.9.98:80/JEUC/api/ea/eaOfficeWeb/getSchoolById',{id:880}).success(function (data){
			$scope.schoolDate = data.data;
			console.log($scope.schoolDate);
//			console.log($scope);
			
		}).error(function (e){
			console.log(e);
		});
	   
	   
	   
	   	//学校类型获取
	   	$http.get('file/schoolType.json').success(function (data){
	   		$scope.schoolType = data.data;
	   	});
	   	
	   	//修改提交
	   	$scope.modify = function (){
	   		
	   		$scope.modifyMsg = {
		   		schoolId : 1,
		   		areaId : $scope.schoolArea.areaId,
		   		schoolType : $scope.schoolDate.school.grade,
		   		schoolName : $scope.schoolDate.school.name,
		   		schoolCode : '',
		   		schoolAddr : $scope.schoolDate.school.address,
		   		schoolLogo : '',
		   		schoolUrl : ''
//		   		gradeIdArray : '',
//		   		gradeNameArray : '',
//		   		yearBegin :  '',
//		   		yearEnd: ''
		   	};
	   		
			console.log($scope.modifyMsg);
	   		
	   		
			$http.post('http://192.168.9.98:80/JEUC/api/ea/eaOfficeWeb/updateSchoolMess',$scope.modifyMsg).success(function (res){
				if(res.ret == '200'){
					alert('hhhh')
				}
			});
	   	};
	   
	   
	}]);
	
	
	
	
	
	