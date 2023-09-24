

       function $(id){return document.getElementById(id);}
       function rememberconfirm(){
           var remember=$("remember");
           if(remember.checked==true){
               if(confirm("请勿在公共场合保存密码，您确定要保存密码吗？")){
                   remember.checked=true;
               }else{
                   remember.checked=false;
               }
           }else{
               remember.checked=false;
           }
       }
       window.onload=function(){
            var username=$("username");
            var password=$("password");
            var remember=$("remember");
            if(localStorage.rememberuser&&localStorage.rememberpaswd){
                remember.checked=true;
                username.value=JSON.parse(localStorage.rememberuser);
                password.value=JSON.parse(localStorage.rememberpaswd);
            }
            remember.onchange=function(){
                if(remember.checked==true){
                    localStorage.setItem("rememberuser",JSON.stringify(username.value));
                    localStorage.setItem("rememberpaswd",JSON.stringify(password.value));
                }else{
                    localStorage.removeItem("rememberuser");
                    localStorage.removeItem("rememberpaswd");
                }
            }
            if(!window.localStorage.user){
                var arr=[];
                arr.push({username:99999999,account:"内置账号",password:123456,phonenum:12345678911,info:"暂无介绍",school:"暂无学校",profess:"暂无专业",birth:"暂无生日"});
                localStorage.setItem("user",JSON.stringify(arr));
            }
            if(!window.localStorage.headimg){
                var arr1=[];
                arr1.push({username:99999999,imgurl:"img/normal.jpeg"});
                localStorage.setItem("headimg",JSON.stringify(arr1));
            }
       } 
       function checklogin(){
            var username=$("username").value;
            var password=$("password").value;
            var eptusername=$("eptusername");
            var eptpassword=$("eptpassword");
            var errmsg=$("errmsg");
            var checkright=true;
            if(username.length==0||password.length==0){
                errmsg.style.display="none";
                if(username==""&&password!=""){
                    eptusername.style.display="block";
                    eptpassword.style.display="none"; 
                    checkright=false;
                }else if(username!=""&&password==""){
                    eptusername.style.display="none"; 
                    eptpassword.style.display="block";      
                    checkright=false;
                }else{
                    eptusername.style.display="block";
                    eptpassword.style.display="block";
                    checkright=false;
                }
            }
       }
       function checkreg(){
            var username=$("username").value;
            var password=$("password").value;
            var eptusername=$("eptusername");
            var eptpassword=$("eptpassword");
            var errmsg=$("errmsg");
            var checkright=true;
            if(username.length==0||password.length==0){
                errmsg.style.display="none";
                if(username==""&&password!=""){
                    eptusername.style.display="block";
                    eptpassword.style.display="none"; 
                    checkright=false;
                }else if(username!=""&&password==""){
                    eptusername.style.display="none"; 
                    eptpassword.style.display="block";      
                    checkright=false;
                }else{
                    eptusername.style.display="block";
                    eptpassword.style.display="block";
                    checkright=false;
                }
            }else{
                errmsg.style.display="none";
                eptusername.style.display="none"; 
                eptpassword.style.display="none";  
                if(window.localStorage.user){
                    var arr=JSON.parse(window.localStorage.user);
                }else{
                    arr=[];
                }
                var flag=0;
                // 登录信息加盐加密之后和数据库中用户信息比较
                var username = hex_md5(username + "i love szu");
                var password = hex_md5(password + "i love szu");

                for(var i =0;i<arr.length;i++){
                    console.log(username,"  ",arr[i].username)
                    if(username==arr[i].username){               
                        if(password==arr[i].password){
                            flag=0;
                            checkright=false;
                            break;   
                        }else{
                            flag=1;
                        }
                    }else{
                        flag=1;               
                    }
                }
                if(flag==1){
                   checkright=false;
                   errmsg.style.display="block";
                }else{
                    localStorage.setItem("nowuser",username);
                    window.location.href="登录后.html"; 
                }
            }
            return checkright;
       }
       function checklogon(){
            var username=$("lusername").value;
            var password=$("lpassword").value;
            var phonenum=$("phonenum").value;

            

            var eptusername=$("leptusername");
            var eptpassword=$("leptpassword");
            var eptphonenum=$("eptphonenum");
            var errname=$("errname");
            var errpaswd=$("errpaswd");
            var errphonenum=$("errphonenum");
            var errmsg=$("errlogon");
            var checkright=true;
            
                var checknum=0;
                eptusername.style.display="none"; 
                eptpassword.style.display="none"; 
                eptphonenum.style.display="none"; 

                var patt = /^[a-zA-Z\d]{6,20}$/;
                if(!patt.test(username)){
                    $("lusername").style.border="red solid 1px";
                    errname.style.display="block";
                }else{
                    $("lusername").style.border="0px";
                    errname.style.display="none";
                    checknum++;
                }
                if(password.length>20||password.length<6){
                    $("lpassword").style.border="red solid 1px";
                    errpaswd.style.display="block";
                }else{
                    $("lpassword").style.border="0px";
                    errpaswd.style.display="none";
                    checknum++;
                }
                if(phonenum.length!=11){
                    $("phonenum").style.border="red solid 1px";
                    errphonenum.style.display="block";
                }else if(phonenum.length==11){
                    $("phonenum").style.border="0px";
                    errphonenum.style.display="none";
                    checknum++;
                }else if(phonenum.length==0){
                    $("phonenum").style.border="0px";
                    errphonenum.style.display="none";
                }
                if(checknum==3){
                    if(window.localStorage.user){
                        var arr=JSON.parse(window.localStorage.user);
                        var arr1=JSON.parse(window.localStorage.headimg);
                    }else{
                        arr=[];
                        arr1=[];
                    }
                    for(var i =0;i<arr.length;i++){                   
                        if(username==arr[i].username){
                            $("lusername").style.border="red solid 1px";                
                            errmsg.style.display="block";
                            checkright=false;
                            return checkright;      
                        }
                    }
                    $("lusername").style.border="0px"; 

                    // !!!md5加盐加密
                    var username = hex_md5(username + "i love szu");
                    var password = hex_md5(password + "i love szu");
                    // var phonenum = hex_md5(phonenum + "i love szu");
                    // console.log('11111user'+username);

                    arr.push({username:username,account:"新用户",password:password,phonenum:phonenum,info:"暂无介绍",school:"暂无学校",profess:"暂无专业",birth:"暂无生日"});
                    arr1.push({username:username,imgurl:"img/normal.jpeg"});
                    alert("注册成功");
                    localStorage.setItem('user',JSON.stringify(arr));
                    localStorage.setItem('headimg',JSON.stringify(arr1));
                    checkright=true;
                }else{
                    checkright=false;
                }   
            
            return checkright;
       }
       function tologon(){
            var returnlogin=$("loginsight");
            var returnlogon=$("logonsight");
            var signleft=$("sign-navi-left");
            var signright=$("sign-navi-right");
            returnlogon.style.display="block";
            returnlogin.style.display="none";
            signleft.style.borderBottom="0";
            signleft.style.fontWeight="normal";
            signright.style.borderBottom="5px solid #056DE8";
            signright.style.fontWeight="bolder";
       }
       function tologin(){
            var returnlogin=$("loginsight");
            var returnlogon=$("logonsight");
            var signleft=$("sign-navi-left");
            var signright=$("sign-navi-right");
            returnlogon.style.display="none";
            returnlogin.style.display="block";
            signright.style.borderBottom="0";
            signright.style.fontWeight="normal";
            signleft.style.borderBottom="5px solid #056DE8";
            signleft.style.fontWeight="bolder";
        }
        window.tologin=tologin;
        window.$=$;
        window.tologon=tologon;
        window.checkreg=checkreg;
        window.checklogon=checklogon;
        window.rememberconfirm=rememberconfirm;
