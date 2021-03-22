function personFile() {
    this.baseUrl = '';
    this.access_code = '';
    this.access_token = '';
    this.loginFlag = false;
    this.picbuf = {};
}
/**
 * 初始化
 */
personFile.prototype.init = function() {
        this.loadEvent();
    }
    /**
     * 添加事件
     */
personFile.prototype.loadEvent = function() {
    var self = this;
    //登录
    $('#unvLoginIn').on('click', function() {
        self.signIn();
    });
    //退出登录
    $('#unvLoginOut').on('click', function() {
        self.signOut();
    });
    //查询人脸抓拍信息列表
    $('#unvQueryTrack').on('click', function() {
        self.doQueryFaceSnap();
    });
    //2.2.25  人脸照片查询人脸轨迹
    $('#unvQueryTrackPic').on('click', function() {
        self.doQueryTrackPic();
    });

    //2.2.1  查询摄像机信息
    $('#unvQuery').on('click', function() {
        self.doQueryCarmera();
    });

    //图片选择
    $('#picbuf').on('change', function(e) {
        self.picbuf = e.target.files[0];
    });
    //查看详情
    $('.unv-look').on('click', function() {
        var detailsArea = $(this).parent().nextAll('.unv-details');
        if (detailsArea.is(':hidden')) {
            detailsArea.show();
        } else {
            detailsArea.hide();
        }
    });
}

/**
 * 登录 第一步
 */
personFile.prototype.signIn = function() {
    var self = this;
    var unvServiceIp = $("#unvServiceIp").val();
    var reg = /(\d{1,3}\.){3}\d{1,3}/;
    var userName = $("#unvName").val();
    var userPwd = $("#unvPassword").val();
    self.baseUrl = "http://" + unvServiceIp + ":8088" + "/VIID/";
    var loginUrl = self.baseUrl + "login";
    jQuery.support.cors = true;
    if (!userName || !userPwd) {
        alert("用户名或者密码不能为空");
        return;
    }
    if (!unvServiceIp) {
        alert("服务器IP不能为空");
        return;
    }
    if (!reg.test(unvServiceIp)) {
        alert('服务器IP错误');
        return;
    }
    $.ajax({
        type: 'POST',
        url: loginUrl,
        data: {},
        success: function(returnedData) {
            self.access_code = returnedData.AccessCode;
            if (self.access_code != null) {
                self.signIn2();
            } else {
                alert("access_code is null!");
            }
        },
        error: function(xhr, status, error) {
            alert(error);
        }
    });
}

/**
 * 登录 第二步
 */
personFile.prototype.signIn2 = function() {
    var self = this;
    var userName = $("#unvName").val();
    var userPwd = $("#unvPassword").val();
    var enuserName = base64encode(userName);
    var enuserPwd = hex_md5(userPwd);
    var login_signature = hex_md5(enuserName + self.access_code + enuserPwd);
    var data = '{"UserName":"' + userName + '","AccessCode":"' + self.access_code + '","LoginSignature":"' + login_signature + '"}';

    var method = "POST";
    var loginUrl = self.baseUrl + "login";
    jQuery.support.cors = true;
    $.ajax({
        type: method,
        url: loginUrl,
        data: data,
        contentType: "application/json",
        //dataType:'json',
        success: function(returnedData) {
            self.access_token = returnedData.AccessToken;
            if (self.access_token != null) {
                self.loginFlag = true;
                var name =
                    $("#unvLoginState").html("登录成功!&nbsp&nbsp&nbsp用户：&nbsp&nbsp&nbsp" + userName);
            } else {
                alert("access_token is null!");
            }
        }
    });
}

//退出登录
personFile.prototype.signOut = function() {
    var self = this;
    var method = "POST";
    var url = self.baseUrl + "logout";
    jQuery.support.cors = true;

    $.ajax({
        type: method,
        url: url,
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization", self.access_token);
        },
        success: function(returnedData) {
            var errcode = returnedData.ErrCode;
            var message = returnedData.ErrMsg;
            if (errcode != 0) {
                alert("退出失败，错误码：" + errcode + "\r\n" + "错误信息为：" + message);
            } else {
                self.loginFlag = false;
                $("#unvLoginState").html("系统还未登录！");
            }
        }
    });
}

/**
 *  查询摄像机信息
 */
personFile.prototype.doQueryCarmera = function() {
    var self = this;
    var code = $("#cameracode").val();
    var type = "GET";
    var url = self.baseUrl + "dev/ec/query/camera/" + code;
    var data = {
        "code": code
    };
    $.ajax({
        type: type,
        url: url,
        contentType: "application/json",
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization", self.access_token);
        },
        success: function(returnedData) {
            self.loadTextDom(url, type, syntaxHighlight(data), syntaxHighlight(returnedData), 'unvTextFour');
        }
    });
}


/**
 * 查询人脸抓拍信息列表
 */
personFile.prototype.doQueryFaceSnap = function() {
        var BeginTimeMod = $("#unvBeginTimeMod").val();
        var EndTimeMod = $("#unvEndTimeMod").val();
        var Rescodmod = $("#unvRescodmod").val();
        var self = this;
        var condition = {
            "ItemNum": 2,
            "Condition": [{
                    "QueryColumn": "snap_time",
                    "LogicFlag": 3,
                    "QueryData": BeginTimeMod
                },
                {
                    "QueryColumn": "snap_time",
                    "LogicFlag": 4,
                    "QueryData": EndTimeMod
                }
            ],
            "QueryCount": 0,
            "PageFirstRowNumber": 0,
            "PageRowNum": 20
        };
        var rescond = {
            "ResNum": 1,
            "ResList": [{
                "ResCode": Rescodmod,
            }]
        };
        var data = {
            condition: condition,
            rescond: rescond
        };
        var type = "GET";
        var url = self.baseUrl + "query/face/snap";
        url = addURLParam(url, data)
        $.ajax({
            type: type,
            url: url,
            contentType: "application/json",
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Authorization", self.access_token);
            },
            success: function(returnedData) {
                self.loadTextDom(url, type, syntaxHighlight(data), syntaxHighlight(returnedData), 'unvTextThree');
            }
        })
    }
    /**
     * 2.2.25  人脸照片查询人脸轨迹
     */
personFile.prototype.doQueryTrackPic = function() {
    var self = this;
    var picbuf = $("#picbuf").val();
    var BeginTime = $("#BeginTime").val();
    var EndTime = $("#EndTime").val();
    var NeedGetFaceFeature = $("#NeedGetFaceFeature").val();
    var MinSimilarity = $("#MinSimilarity").val();
    var MaxSimilarity = $("#MaxSimilarity").val();
    var LimitNum = $("#LimitNum").val();
    var formData = new FormData();
    var data = {
        "TimeScale": {
            "BeginTime": BeginTime,
            "EndTime": EndTime
        },
        "ThriftSearchInfo": {
            "NeedGetFaceFeature": 1,
            "IahrFaceBaseInfo": {
                "FaceFliterInfo": {
                    "MinSimilarity": MinSimilarity,
                    "MaxSimilarity": MaxSimilarity
                }
            },
            "LimitNum": LimitNum - 0
        }
    };
    formData.append('param', JSON.stringify(data));
    formData.append('picbuf', self.picbuf);
    var type = "POST";
    var url = self.baseUrl + "query/track";
    $.ajax({
        type: type,
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization", self.access_token);
        },
        success: function(returnedData) {
            self.loadTextDom(url, type, syntaxHighlight(data), syntaxHighlight(returnedData), 'unvTextTwo');
        }
    })
}

/**
 * 加载详细信息DOM
 */
personFile.prototype.loadTextDom = function(url, type, paramIn, paramOut, domId) {
    var html = '<div class="unv-text">' +
        '<label><span>URL：</span><span>' + url + '</span></label>' +
        '<label><span>请求方式：</span><span>' + type + '</span></label>' +
        '</div>' +
        '<div class="unv-text">入参</div>' +
        '<pre class="unv-text">' + paramIn + '</pre>' +
        '<div class="unv-text">出参</div>' +
        '<pre class="unv-text">' + paramOut + '</pre>';
    $('#' + domId).html(html).show();
}

//初始化
$(document).ready(function() {
    var personFace = new personFile();
    personFace.init();
});