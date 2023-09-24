function $(id){return document.getElementById(id);}
function displayinfo(){
    var secondnavi=$("secondnavi");
    secondnavi.style.display="block";
}

function NOTdisplayinfo(){
    var secondnavi=$("secondnavi");
    secondnavi.style.display="none";
}

getitemfromlocal();

function getitemfromlocal(){
    if(window.localStorage.user){
        var arr=JSON.parse(window.localStorage.user);
        var arr1=JSON.parse(window.localStorage.headimg);
    }else{
        arr=[];
        arr1=[];
    }
    for(var i=0;i<arr1.length;i++){
        if(arr1[i].username==localStorage.nowuser){
            $("imgButton").style.backgroundSize="100% 100%";
            $("imgButton").style.backgroundImage="url("+arr1[i].imgurl+")";
            $("user_avatar").style.backgroundSize="100% 100%";
            $("user_avatar").style.backgroundImage="url("+arr1[i].imgurl+")";
        }
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i].username==localStorage.nowuser){
            $("mainusername").innerText=arr[i].account;
            $("infousername").innerText=arr[i].account;
            $("infophone").innerText=arr[i].phonenum;
            $("infoschool").innerText=arr[i].school;
            $("infoprofess").innerText=arr[i].profess;
            $("infobirth").innerText=arr[i].birth;
            $("infoinfo").innerText=arr[i].info;
        }
        
    }
    
}

function toedit(){
    $("displaypart").style.display="none";
    $("editpart").style.display="block";
    $("infobutton").innerText="返回个人主页";
    editinit();
}

function tomainpage(){
    $("displaypart").style.display="block";
    $("editpart").style.display="none";
    $("infobutton").innerText="编辑个人资料";
    getitemfromlocal();
}

function editinit(){
    if(window.localStorage.user){
        var arr=JSON.parse(window.localStorage.user);
    }else{
        arr=[];
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i].username==localStorage.nowuser){
            $("mainusername").innerText=arr[i].account;
            $("editinfousername").value=arr[i].account;
            $("editinfophone").value=arr[i].phonenum;
            $("editinfoschool").value=arr[i].school;
            $("editinfoprofess").value=arr[i].profess;
            $("editinfobirth").value=arr[i].birth;
            $("editinfoinfo").value=arr[i].info;
        }
    }
}

function editdata(){
    var i=0;
    if(window.localStorage.user){
        var arr=JSON.parse(window.localStorage.user);
    }else{
        arr=[];
    }
    for(i=0;i<arr.length;i++){
        if(arr[i].username==localStorage.nowuser){
            var phone=$("editinfophone").value;
            if(phone.length!=11){
                phone=arr[i].phonenum;
            } 
            var account=$("editinfousername").value;
            if(account.length==0){
                account="新用户";
            }
            var school=$("editinfoschool").value;
            if(school.length==0){
                school="暂无学校";
            }
            var profess=$("editinfoprofess").value;
            if(profess.length==0){
                profess="暂无学校";
            }
            var birth=$("editinfobirth").value;
            if(birth.length==0){
                birth="暂无学校";
            }
            var info=$("editinfoinfo").value;
            if(info.length==0){
                info="暂无学校";
            }
            arr.splice(i,1,{username:arr[i].username,account:account,password:arr[i].password,phonenum:phone,info:info,school:school,profess:profess,birth:birth});
        } 
    }
    localStorage.setItem('user',JSON.stringify(arr));
}

function editaccount(){
    $("graydiv").style.opacity=0.3;
    $("graydiv").style.display="block";
    $("editaccount1").style.display="block";
}

function returnpage(){
    $("graydiv").style.opacity=1;
    $("graydiv").style.display="none";
    $("editaccount1").style.display="none";
    $("editaccount2").style.display="none";
}

function toeditaccount(){
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

                // !!!md5加盐加密
                var username = hex_md5(username + "i love szu");
                var password = hex_md5(password + "i love szu");

                for(var i =0;i<arr.length;i++){                   
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
                    $("editaccount1").style.display="none";
                    $("editaccount2").style.display="block";
                }
            }
            return checkright;
}

function checkpaswd(){
    var oldpassword=$("oldpaswd").value;
    var newpassword1=$("newpaswd1").value;
    var newpassword2=$("newpaswd2").value;
    if(oldpassword.length>20||oldpassword.length<6){
        $("errpaswd1").style.display="block";
        $("errpaswd4").display="none";
    }
    if(newpassword1.length>20||newpassword1.length<6){
        $("errpaswd2").style.display="block";
        $("errpaswd5").display="none";
    }
    if(newpassword2.length>20||newpassword2.length<6){
        $("errpaswd3").style.display="block";
    }
}

function submitpaswd(){
    var oldpassword=$("oldpaswd").value;
    var newpassword1=$("newpaswd1").value;
    var newpassword2=$("newpaswd2").value;
    $("errpaswd1").style.display="none";
    $("errpaswd2").style.display="none"; 
    $("errpaswd3").style.display="none";
    var i=0;
    if(window.localStorage.user){
        var arr=JSON.parse(window.localStorage.user);
    }else{
        arr=[];
    }
    var flag=0;

    // md5
    var oldpassword = hex_md5(oldpassword + "i love szu");
    for(i=0;i<arr.length;i++){
        if(arr[i].username==localStorage.nowuser){
           if(arr[i].password!=oldpassword)
           {
                $("errpaswd4").style.display="block";
                flag=1;  
           }
        } 
    }
    if(newpassword1!=newpassword2){
        $("errpaswd5").style.display="block";
        flag=1;
    }

    // md5
    var newpassword1 = hex_md5(newpassword1 + "i love szu");
    if(flag!=1){
        for(i=0;i<arr.length;i++){
            if(arr[i].username==localStorage.nowuser){
                arr.splice(i,1,{username:arr[i].username,account:arr[i].account,password:newpassword1,phonenum:arr[i].phonenum,info:arr[i].info,school:arr[i].school,profess:arr[i].profess,birth:arr[i].birth});   
            } 
        }
        localStorage.setItem('user',JSON.stringify(arr));
        alert("密码修改成功！")
        returnpage();
    }
}

function checkforget(){
    var username=$("username").value;
    var phonenum=$("phonenum").value;
    var eptusername=$("eptusername");
     var eptphonenum=$("eptphonenum");
    var errmsg=$("errmsg");
    var checkright=true;
    if(username.length==0||phonenum.length==0){
        errmsg.style.display="none";
        if(username==""&&phonenum!=""){
            eptusername.style.display="block";
            eptphonenum.style.display="none"; 
            checkright=false;
        }else if(username!=""&&phonenum==""){
            eptusername.style.display="none"; 
            eptphonenum.style.display="block";      
            checkright=false;
        }else{
            eptusername.style.display="block";
            eptphonenum.style.display="block";
            checkright=false;
        }
    }
    return checkright;
}

function toeditaccountforget(){
    var username=$("username").value;
            var phonenum=$("phonenum").value;
            var eptusername=$("eptusername");
            var eptphonenum=$("eptphonenum");
            var errmsg=$("errmsg");
            var checkright=true;
            if(username.length==0||phonenum.length==0){
                errmsg.style.display="none";
                if(username==""&&password!=""){
                    eptusername.style.display="block";
                    eptphonenum.style.display="none"; 
                    checkright=false;
                }else if(username!=""&&password==""){
                    eptusername.style.display="none"; 
                    eptphonenum.style.display="block";      
                    checkright=false;
                }else{
                    eptusername.style.display="block";
                    eptphonenum.style.display="block";
                    checkright=false;
                }
            }else{
                errmsg.style.display="none";
                eptusername.style.display="none"; 
                eptphonenum.style.display="none";  
                if(window.localStorage.user){
                    var arr=JSON.parse(window.localStorage.user);
                }else{
                    arr=[];
                }
                var flag=0;

                // !!!md5加盐加密
                var username = hex_md5(username + "i love szu");
                for(var i =0;i<arr.length;i++){                   
                    if(username==arr[i].username){               
                        if(phonenum==arr[i].phonenum){
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
                    $("editaccountforget1").style.display="none";
                    $("editaccountforget2").style.display="block";
                    localStorage.setItem("nowuser",username);
                }
            }
            return checkright;
}

function returnpage1(){
    $("editaccountforget1").style.display="block";
    $("editaccountforget2").style.display="none";
}

function checkpaswdforget(){
    var newpassword1=$("newpaswd1").value;
    var newpassword2=$("newpaswd2").value;
    if(newpassword1.length>20||newpassword1.length<6){
        $("errpaswd2").style.display="block";
        $("errpaswd5").display="none";
    }
    if(newpassword2.length>20||newpassword2.length<6){
        $("errpaswd3").style.display="block";
    }
}

function submitpaswdforget(){
    var newpassword1=$("newpaswd1").value;
    var newpassword2=$("newpaswd2").value;
    $("errpaswd2").style.display="none"; 
    $("errpaswd3").style.display="none";
    var i=0;
    if(window.localStorage.user){
        var arr=JSON.parse(window.localStorage.user);
    }else{
        arr=[];
    }
    var flag=0;
    if(newpassword1!=newpassword2){
        $("errpaswd5").style.display="block";
        flag=1;
    }
    // !!!md5加盐加密
    var newpassword1 = hex_md5(newpassword1 + "i love szu");
    if(flag!=1){
        for(i=0;i<arr.length;i++){
            if(arr[i].username==localStorage.nowuser){
                arr.splice(i,1,{username:arr[i].username,account:arr[i].account,password:newpassword1,phonenum:arr[i].phonenum,info:arr[i].info,school:arr[i].school,profess:arr[i].profess,birth:arr[i].birth});   
            } 
        }
        localStorage.setItem('user',JSON.stringify(arr));
        alert("密码修改成功！")
        window.location.href="登录.html";
    }
}

const upload = $('js_logo_img');
let imgUrl = '';
    upload.onchange = function (value) {
        var oFReader = new FileReader();
        var file = upload.files[0];
        oFReader.readAsDataURL(file);
        oFReader.onloadend = function(oFRevent){
            var src = oFRevent.target.result;
            imgUrl = src;
            $("user_avatar").style.backgroundImage = "url("+imgUrl+")";
            $("user_avatar").style.backgroundSize="100% 100%";
            $("imgButton").style.backgroundImage = "url("+imgUrl+")";
            $("imgButton").style.backgroundSize="100% 100%";
            var arr1=JSON.parse(window.localStorage.headimg);
            for(var i=0;i<arr1.length;i++){
                if(arr1[i].username==localStorage.nowuser){
                     arr1.splice(i,1,{username:arr1[i].username,imgurl:imgUrl});
                }
            }
            localStorage.setItem('headimg',JSON.stringify(arr1));
            getitemfromlocal();
        }       
    }
