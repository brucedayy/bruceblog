var ue = UE.getEditor('editor', {
    toolbars: [['Undo', 'Redo', 'bold', 'test', 'fullscreen', 'fontfamily',
        'fontsize', 'insertcode', 'emotion', 'simpleupload', 'attachment']],
    initialFrameWidth: 750,
    initialFrameHeight: 300,
    autoClearinitialContent: true,
    //wordCount: false,
    elementPathEnabled: false,
});

//function loadScript(url) {
//    var script = document.createElement("script");
//    script.type = "text/javascript";
//    script.src = url;
//    document.body.appendChild(script);
//}

//跨浏览器的事件对象
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};
var liobjectarr = {
    0: document.getElementById("indexcontentdiv"),
    1: document.getElementById("dynamiccontentdiv"),
    2: document.getElementById("writeblogcontentdiv"),
    3: document.getElementById("messagecontentdiv")
};
function navlichange(index, n) {
    for (var i = 0; i < n; i++) {
        if (i == index) {         
            if (i == 2 && document.getElementById("login").children[0].innerText=="登陆")
            {
                document.getElementById("login").children[0].click();                
            }
            navul.children[i].style.backgroundColor = "red";
            //liobjectarr[i].style.visibility = "visible";
            liobjectarr[i].style.display = "block";
        }
        else {
            navul.children[i].style.backgroundColor = "#808080";
            //liobjectarr[i].style.visibility = "hidden";
            liobjectarr[i].style.display = "none";
        }
    }
}
var handler = {
    0: function () { navlichange(0, 4) },
    1: function () { navlichange(1, 4) },
    2: function () { navlichange(2, 4) },
    3: function () { navlichange(3, 4) }
};
var navul = document.getElementById("navul");
for (var i = 0; i < navul.children.length; i++) {
    EventUtil.addHandler(navul.children[i], "click", handler[i]);
}

var SignupLogin = {
    0: document.getElementById("signupopdialog"),
    1: document.getElementById("signupback"),
    2: document.getElementById("loginformarea"),
    3: document.getElementById("signupformarea")
};

EventUtil.addHandler(document.getElementById("login").children[0], "click", function () {
    if (document.getElementById("signup").children[0].innerText != "|注销") {
        SignupLogin[0].style.visibility = "visible";
        SignupLogin[1].style.visibility = "visible";
        SignupLogin[2].style.visibility = "visible";
        SignupLogin[3].style.visibility = "hidden";
    }
});
EventUtil.addHandler(document.getElementById("signup").children[0], "click", function () {
    if (document.getElementById("signup").children[0].innerText != "|注销") {
        SignupLogin[0].style.visibility = "visible";
        SignupLogin[1].style.visibility = "visible";
        SignupLogin[2].style.visibility = "hidden";
        SignupLogin[3].style.visibility = "visible";
    } else {
        document.getElementById("signup").children[0].innerText = "|注册";
        document.getElementById("login").children[0].innerText = "登陆";
    }
});

EventUtil.addHandler(document.getElementById("signupcancel"), "mousedown", function () {
    for (var i = 0; i < 4; i++)
        SignupLogin[i].style.visibility = "hidden";
});

EventUtil.addHandler(document.getElementById("spanlogincancel"), "mousedown", function () {
    for (var i = 0; i < 4; i++)
        SignupLogin[i].style.visibility = "hidden";
});

function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefiend") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"], i, len;
            for (i = 0, len = versions.length; i < len; i++)
            {
                try{
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString=versions[i];
                    break;
               }catch(ex){}
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available.");
    }
}
var xhr = createXHR();
//xhr.onreadystatechange = function () {
//    if (xhr.readyState == 4) {
//        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//            alert(xhr.responseText);
//        } else {
//            alert("Request was unsuccessful: " + xhr.status);
//        }
//    }
//};
//xhr.open("get", "wwww.baidu.com", true);
//xhr.send(null);

EventUtil.addHandler(document.getElementById("signupsubmit"), "mousedown", function () {
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                alert(xhr.responseText);
            } else {
                alert("Request was unsuccessful: " + xhr.status);
            }
        }
    };
    xhr.open("post", "registration.ashx", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var form = document.getElementById("formusersignup");
    xhr.send(serialize(form));
    //xhr.send(null);
});

EventUtil.addHandler(document.getElementById("spanlogin"), "mousedown", function () {
    funLoginUser();
});
EventUtil.addHandler(document.getElementById("btnPubBlogArticle"), "click", function () {
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                alert(xhr.responseText);
            } else {
                alert("Request was unsuccessful: " + xhr.status);
            }
        }
    };
    var artitle = document.getElementById("inputBlogTitle").value;
    //var nkname = document.getElementById("login").children[0].innerText;
    var nkname = nkNameValue;
    var arcontent = ue.getContent();
    var ptime = (new Date()).toLocaleString();
    var url="publishblog.ashx";
    url=addURLParam(url,"arTitle",artitle);
    url=addURLParam(url,"nkName",nkname);
    url=addURLParam(url,"arContent",arcontent);
    url=addURLParam(url,"pTime",ptime);
    xhr.open("post", url, true);
    //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //var form = document.getElementById("formuserlogin");
    //xhr.send(serialize(form));
    //xhr.send(null);
    xhr.send(null);
});

function addURLParam(url, name, value){
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}

//表单序列化
function serialize(form) {
    var parts = [],
        field=null,
        i,
        len,
        j,
        optLen,
        option,
        optValue;
    for (i = 0, len = form.elements.length; i < len; i++) {
        field = form.elements[i];
        switch (field.type) {
            case "select-one":
            case "select-multiple":
                if (field.name.length) {
                    for (j = 0, optLen = field.options.length; j < optLen; j++) {
                        open = field.options[j];
                        if (option.selected) {
                            optValue = "";
                            if (option.hasAttribute) {
                                optionValue = (option.hasAttribute("value") ? option.value : option.text);
                            } else {
                                optValue = (option.attributes["value"].specified ? option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                        }
                    }
                }
                break;
            case undefined:   //字段集
            case "file":      //文件输入
            case "submit":    //提交按钮
            case "reset":     //重置按钮
            case "button":    //自定义按钮
                break;
            case "radio":     //单选按钮
            case "checkbox":  //复选框
                if (!field.checked) {
                    break;
                }
                /*执行默认操作*/
            default:
                //不包含没有名字的表单字段
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
}

//var uname = document.getElementById("uname");
//var pwd = document.getElementById("pwd");
//var phonenum = document.getElementById("phonenum");
//var email = document.getElementById("email");

//刷新测试
function funcRefreshDynamic() {
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                var responseJsonStr = xhr.responseText;
                //var jsonText = JSON.stringify(responseJsonStr);
                //var dyn = JSON.parse(jsonText, function (key, value) {
                //    return value;
                //});
                //alert(dyn["JblogComments"]);   
                funcDynamicObject(responseJsonStr);
                PreLogin();
            } else {
                alert("Request was unsuccessful: " + xhr.status);
            }
        }
    };
    xhr.open("post", "dynamic.ashx", true);
    xhr.send(null);
    function funcDynamicObject(rjsonStr) {
        var obj = eval(rjsonStr);
        var objCount = obj.length;
        //alert(rjsonStr);
        var dynamicMainArea = document.getElementById("dynamicmainArea");
        //for (var i = 0; i < obj.length; i++)
        //{
        //    var k=0;
        //    for (var j = 0; j < obj[i].JblogComments.length; j++) {
        //        alert("文章标题:" + obj[i].JblogTitle + "++++++++"
        //            + "文章作者:" + obj[i].JblogAuthor + "++++++++"
        //            + "文章内容" + obj[i].JblogContent + "++++++++"
        //            + "发布时间" + obj[i].JblogPubTime + "++++++++"
        //            + "评论:" + (++k).toString() +":"+ obj[i].JblogComments[j].CommentContent + "+++++"
        //            + "评论人:" + obj[i].JblogComments[j].NickName + "+++++"
        //            + "评论时间:" + obj[i].JblogComments[j].PubTime
        //            );
        //    }
        //}
        //var chdblogitem = document.createElement('div');
        //chd.innerHTML = obj[1].JblogContent;
        //chd.style.width = "800px";
        //var chdcomment = document.createElement('span');
        //chdcomment.innerHTML=
        //dynamicMainArea.appendChild(chd);
        for (var i = 0; i < obj.length; i++)
        {
            var k = 0;            
            var chd = document.createElement('div');
            //chd.style.width = "800px";
            //chd.style.maxWidth = "800px";
            chd.style.marginTop = "20px";
            //chd.style.backgroundColor = "yellow";     
            chd.style.backgroundColor = "#f5f0f0";
            var chdspanTitle = document.createElement("span");
            chdspanTitle.style.height = "30px";
            chdspanTitle.style.display = "block";
            chdspanTitle.style.fontFamily = "Microsoft YaHei";
            chdspanTitle.style.fontSize = "18px";
            chdspanTitle.innerText = obj[i].JblogTitle;
            //chdspanTitle.style.backgroundColor = "red";
            var chdspanContent = document.createElement("span");
            chdspanContent.innerHTML = obj[i].JblogContent;
            //chdspanContent.style.width = "800px";
            chdspanContent.style.maxWidth = "800px";
            //chdspanContent.style.height = "400px";
            chdspanContent.style.display = "block";
            //chdspanContent.style.backgroundColor = "green";
            var chdspanAuthorTime = document.createElement("span");
            chdspanAuthorTime.innerText = obj[i].JblogAuthor + "于" + obj[i].JblogPubTime+"发布了这篇文章"
            //chdspanAuthorTime.style.width = "800px";
            chdspanAuthorTime.style.maxWidth = "800px";
            chdspanAuthorTime.style.display = "block";
            chdspanAuthorTime.style.height = "30px";
            chdspanAuthorTime.style.fontSize = "8px";
            //chdspanAuthorTime.style.backgroundColor = "blue";
            dynamicMainArea.appendChild(chd);
            chd.appendChild(chdspanTitle);
            chd.appendChild(chdspanContent);
            chd.appendChild(chdspanAuthorTime);
            var chdCommentsArea = document.createElement("div");
            //chdCommentsArea.style.width = "800px";
            chdCommentsArea.style.maxWidth = "800px";
            chdCommentsArea.style.marginTop = "10px";
            //chdCommentsArea.style.height = "200px";
            //chdCommentsArea.style.backgroundColor = "white";
            chd.appendChild(chdCommentsArea);
            //chdCommentsArea.style.width = "800px";            
            //dynamicMainArea.appendChild("chdCommentsArea");
            for (var j = 0; j < obj[i].JblogComments.length; j++)
            {                
                //var chdspanCMcontent = document.createElement("span");
                //chdspanCMcontent.style.width = "800px;";
                //chdspanCMcontent.style.display = "block";
                //var chdspanCMNickTime = document.createElement("span");
                //chdspanCMNickTime.style.width = "800px";
                //chdspanCMNickTime.style.display = "block";
                //chdspanCMNickTime.style.height = "30px";
                //chdspanCMNickTime.style.display = "block";
                //chdCommentsArea.appendChild("chdspanCMcontent");
                //chdCommentsArea.appendChild("chdspanCMNickTime");
                var chdspanCMitem = document.createElement("span");
                chdspanCMitem.style.width = "800px;";
                //chdspanCMitem.style.height = "120px";
                chdspanCMitem.style.display = "block";
                //chdspanCMitem.style.backgroundColor = "yellow";
                chdCommentsArea.appendChild(chdspanCMitem);
                var chdspanCMcontent = document.createElement("span");
                chdspanCMcontent.innerHTML = obj[i].JblogComments[j].CommentContent;
                chdspanCMcontent.style.width = "800px;";
                chdspanCMcontent.style.height = "40px";
                //chdspanCMcontent.style.backgroundColor = "red";
                chdspanCMcontent.style.display = "block";
                chdspanCMitem.appendChild(chdspanCMcontent);
                var chdspanCMNickTime = document.createElement("span");
                chdspanCMNickTime.innerText = obj[i].JblogComments[j].NickName + "于" + obj[i].JblogComments[j].PubTime + "发表此评论";
                chdspanCMNickTime.style.width = "800px";
                chdspanCMNickTime.style.display = "block";
                chdspanCMNickTime.style.height = "30px";
                chdspanCMNickTime.style.fontSize = "6px";
                //chdspanCMNickTime.style.backgroundColor = "green";
                chdspanCMitem.appendChild(chdspanCMNickTime);
            }
            //for (var j = 0; j < obj[i].JblogComments.length; j++) {
            //    alert("文章标题:" + obj[i].JblogTitle + "++++++++"
            //        + "文章作者:" + obj[i].JblogAuthor + "++++++++"
            //        + "文章内容" + obj[i].JblogContent + "++++++++"
            //        + "发布时间" + obj[i].JblogPubTime + "++++++++"
            //        + "评论:" + (++k).toString() +":"+ obj[i].JblogComments[j].CommentContent + "+++++"
            //        + "评论人:" + obj[i].JblogComments[j].NickName + "+++++"
            //        + "评论时间:" + obj[i].JblogComments[j].PubTime
            //        );
            //}
        }
     
    }
    function PreLogin()
    {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    if (xhr.responseText.length > 3) {                       
                        var nkName = xhr.responseText.split("&")[1];
                        nkNameValue = nkName;
                        document.getElementById("login").children[0].innerText = nkName.length < 4 ? nkName : nkName[0] + nkName[1] + nkName[2] + "...";
                        document.getElementById("signup").children[0].innerText = "|注销";
                        for (var i = 0; i < 4; i++)
                            SignupLogin[i].style.visibility = "hidden";                  
                    }
                } else {
                    alert("Request was unsuccessful: " + xhr.status);
                }
            }
        };
        document.getElementById("loginpnum").value = CookieUtil.get("pnum");
        document.getElementById("loginpwd").value = CookieUtil.get("pwd");
        xhr.open("post", "login.ashx", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var form = document.getElementById("formuserlogin");
        xhr.send(serialize(form));
    }
}

function LoginSession(pnum,pwd) {
    //xhr.onreadystatechange = function () {
    //    if (xhr.readyState == 4) {
    //        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
    //            alert(xhr.responseText);
    //        } else {
    //            alert("Request was unsuccessful: " + xhr.status);
    //        }
    //    }
    //};
    ////var url = "SessionAdmin.aspx";
    ////url = addURLParam(url,"pnum","ok");
    //xhr.open("post", "SessionAdmin.ashx", true);
    //xhr.send(null);
    CookieUtil.set("pnum", pnum);
    CookieUtil.set("pwd", pwd);
    //alert(CookieUtil.get("name"));
    //alert(CookieUtil.get("pwd"));
}


//CookieUtil对象读取、写入、和删除cookie
var CookieUtil = {
    get: function (name) {
        var cookieName = encodeURIComponent(name) + "=",
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    unset: function (name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }
};

window.onload = funcRefreshDynamic;

function funWindowLoad()
{
    funLoginUser();
}

var nkNameValue;
function funLoginUser()
{
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                //alert(xhr.responseText);
                if (xhr.responseText.length>3)
                {
                    LoginSession(document.getElementById("loginpnum").value, document.getElementById("loginpwd").value);
                    var nkName = xhr.responseText.split("&")[1];
                    nkNameValue = nkName;
                    document.getElementById("login").children[0].innerText = nkName.length<4?nkName:nkName[0]+nkName[1]+nkName[2]+"...";
                    document.getElementById("signup").children[0].innerText = "|注销";
                    for (var i = 0; i < 4; i++)
                        SignupLogin[i].style.visibility = "hidden";
                } else {
                    alert("账号或密码错误");
                }
            } else {
                alert("Request was unsuccessful: " + xhr.status);
            }
        }
    };
    //xhr.open("post", "dynamic.ashx", true);
    xhr.open("post", "login.ashx", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var form = document.getElementById("formuserlogin");
    xhr.send(serialize(form));
    //xhr.send(null);
}


