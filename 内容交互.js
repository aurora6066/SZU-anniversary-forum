var activeQustionID;
var activeCommentID;


function $(id){return document.getElementById(id);}
function editquestion(){
    if(document.title == "首页 - 深圳大学40周年校庆"){
        loginFail();
        return;
    }
    $("graydiv").style.opacity=0.3;
    $("graydiv").style.display="block";
    $("questionblock1").style.display="block";
}

function checkquestion(){
    let question = $("question-text").value;
    if(question.length==0){
        $("eptquestion").style.display="inline-flex";
    }
    else{
        $("eptquestion").style.display="none";
    }
}

function ShowAllComment(currentEle){
    let question = currentEle.parentNode.parentNode;
    let questionId = question.id;
    let imgPath;
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        if(key.slice(0,3) == "img" && key.slice(3,key.length) == questionId.slice(3,questionId.length)){
            imgPath = localStorage.getItem(key);
            break;
        }
    }
    if(imgPath != null) question.childNodes[1].src = imgPath;
    let richContent = question.childNodes[2];
    let length = richContent.childNodes.length;
    for(let i = 0; i < length; i++){
        richContent.childNodes[0].remove();
    }
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        if(key.slice(0,3) == "com") {
            let startIndex = key.indexOf(" ") + 1;
            let questionIdCur = key.slice(startIndex,key.length);
            if(questionIdCur == questionId){
                updateComment(key, 100);
            }
        }
    }
}

function HideComment(currentEle){
    let question = currentEle.parentNode.parentNode;
    let questionId = question.id;
    let richContent = question.childNodes[2];
    let length = richContent.childNodes.length;
    question.childNodes[1].src = "";
    for(let i = 0; i < length; i++){
        richContent.childNodes[0].remove();
    }
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        if(key.slice(0,3) == "com") {
            let startIndex = key.indexOf(" ") + 1;
            let questionIdCur = key.slice(startIndex,key.length);
            if(questionIdCur == questionId){
                updateComment(key, 2);
            }
        }
    }
}
function updateQuestion(keyuser, imgPath){
    let question = localStorage.getItem(keyuser);
    let questionItem = document.createElement("div");
    questionItem.className = "questionItem";

    let questionTitle = document.createElement("h2");
    questionTitle.className = "questionItem-Title";
    questionTitle.innerHTML = question;

    let questionImg = document.createElement("img");
    questionImg.className = "questionImg";
    questionImg.src = imgPath;

    let richContent = document.createElement("div");
    richContent.className = "richContent";

    let richContentInner = document.createElement("div");
    richContentInner.className = "richContent-inner";

    let innerPassage = document.createElement("span");
    let innerButton = document.createElement("button");

    innerPassage.innerHTML = "评论来为该条目增添更多内容";

    innerButton.type = "button";
    innerButton.className = "MoreButton";

    let questionAction = document.createElement("div");
    questionAction.className = "questionItem-action";

    let ActionButton1 = document.createElement("button");
    let ActionButton2 = document.createElement("button");
    let ActionButton3 = document.createElement("button");
    let ActionButton4 = document.createElement("button");
    let ActionButton5 = document.createElement("button");


    ActionButton1.type = "button";
    ActionButton2.type = "button";
    ActionButton3.type = "button";
    ActionButton4.type = "button";
    ActionButton5.type = "button";


    ActionButton1.className = "voteButton";
    ActionButton2.className = "voteButton";
    ActionButton3.className = "discussButton";
    ActionButton4.className = "discussButton";
    ActionButton5.className = "discussButton";

    innerButton.innerHTML = "阅读原文";
    ActionButton1.innerHTML = "赞同";
    ActionButton2.innerHTML = "反对";
    ActionButton3.innerHTML = "评论";
    ActionButton4.innerHTML = "展开";
    ActionButton5.innerHTML = "收起";



    ActionButton3.setAttribute("onclick", "return AddComment(this)");
    ActionButton4.setAttribute("onclick", "return ShowAllComment(this)");
    ActionButton5.setAttribute("onclick", "return HideComment(this)");


    questionAction.appendChild(ActionButton1);
    questionAction.appendChild(ActionButton2);
    questionAction.appendChild(ActionButton3);
    questionAction.appendChild(ActionButton4);
    questionAction.appendChild(ActionButton5);

    richContentInner.appendChild(innerPassage);
    richContentInner.appendChild(innerButton);
    // richContent.appendChild(richContentInner);

    questionItem.appendChild(questionTitle);
    questionItem.appendChild(questionImg);
    questionItem.appendChild(richContent);
    questionItem.appendChild(questionAction);

    questionItem.id = keyuser;
    let fatherNode = $("question1");
    fatherNode.insertBefore(questionItem, fatherNode.childNodes[0]);

    $("graydiv").style.display="none";
    $("questionblock1").style.display="none";
}

function toeditquestion(){
    checkquestion();
    let question = $("question-text").value;

    let user = localStorage.getItem("nowuser");
    let head = "que";
    user = head + user + " " + Math.random();
    localStorage.setItem(user, question);

    updateQuestion(user, "");

}

function updateAll(){
    const tui = document.querySelector(".tui");
    const re = document.querySelector(".re");

    tui.addEventListener("click", () => {
        tui.classList.add("liis-active");
        re.classList.remove("liis-active");
    });

    re.addEventListener("click", () => {
        re.classList.add("liis-active");
        tui.classList.remove("liis-active");
    });

    let questionSize = $("question1").childNodes.length;
    for(let i = 0; i < questionSize; i++){
        $("question1").childNodes[0].remove();
    }

    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        if(key.slice(0,3) == "que") {
            updateQuestion(key, "");
        }
    }

    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        if(key.slice(0,3) == "com") {
            updateComment(key, 2);
        }
    }

    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        if(key.slice(0,3) == "rep") {
            updateReply(key);
        }
    }
}

function checkComment(){
    let comment = $("comment-text").value;
    if(comment.length==0){
        $("eptcomment").style.display="inline-flex";
        return false;
    }
    else{
        $("eptcomment").style.display="none";
        return true;
    }
}

function AddComment(currentEle){
    if(document.title == "首页 - 深圳大学40周年校庆"){
        loginFail();
        return;
    }
    $("graydiv").style.opacity=0.3;
    $("graydiv").style.display="block";
    $("commentBlock1").style.display="block";

    let activeQuestion = currentEle.parentNode.parentNode;
    activeQustionID = activeQuestion.id;
}

function toAddComment(){
    if(checkComment() == false) {return};
    let comment = $("comment-text").value;

    let user = localStorage.getItem("nowuser");
    let head = "com";
    user = head + user + "+" + Math.random() + " " + activeQustionID;
    localStorage.setItem(user, comment);
    updateComment(user, 2);
}
function removeComment(currentEle){
    if(document.title == "首页 - 深圳大学40周年校庆"){
        loginFail();
        return;
    }
    if(confirm("确定要删除该评论吗") == true){
        let commentId = currentEle.parentNode.id;
        for(let i = 0; i < localStorage.length; i++){
            let startIndex = localStorage.key(i).indexOf(" ");
            let currCommentId = localStorage.key(i).slice(startIndex+1,localStorage.key(i).length);
            if(commentId == currCommentId){
                localStorage.removeItem(localStorage.key(i));
            }
        }
        localStorage.removeItem(currentEle.parentNode.id);
        currentEle.parentNode.remove();
    }
}

function stickToTop(currentEle){
    if(document.title == "首页 - 深圳大学40周年校庆"){
        loginFail();
        return;
    }
    let richContent = currentEle.parentNode.parentNode;
    richContent.insertBefore(currentEle.parentNode,richContent.childNodes[0]);
}

function replayComment(currentEle){
    if(document.title == "首页 - 深圳大学40周年校庆"){
        loginFail();
        return;
    }
    $("graydiv").style.opacity=0.3;
    $("graydiv").style.display="block";
    $("replyBlock1").style.display="block";

    let activeComment = currentEle.parentNode;
    activeCommentID = activeComment.id;
}

function checkReply(){
    let reply = $("reply-text").value;
    if(reply.length==0){
        $("eptreply").style.display="inline-flex";
        return false;
    }
    else{
        $("eptreply").style.display="none";
        return true;
    }
}

function updateReply(keyuser){
    let startIndex = keyuser.indexOf(" ") + 1;
    let commentId = keyuser.slice(startIndex,keyuser.length);
    let commentEle = $(commentId);

    let replyContent = document.createElement("span");
    let endIndex = keyuser.indexOf("+");
    replyContent.innerHTML = keyuser.slice(3,endIndex) + ":  " + localStorage.getItem(keyuser);
    replyContent.className = "replyContent";
    commentEle.childNodes[1].appendChild(replyContent);

    $("graydiv").style.display="none";
    $("replyBlock1").style.display="none";
}
function toAddReply(){
    if(checkReply() == false) return;
    let reply = $("reply-text").value;

    let user = localStorage.getItem("nowuser");
    let head = "rep";
    user = head + user + "+" + Math.random() + " " + activeCommentID;
    localStorage.setItem(user, reply);
    updateReply(user);
}

function updateComment(keyuser, maxSize){
    let startIndex = keyuser.indexOf(" ") + 1;
    let questionId = keyuser.slice(startIndex,keyuser.length);
    let questionEle = $(questionId);
    if(questionEle == null) return;
    let richContent = questionEle.childNodes[2];
    let comment = localStorage.getItem(keyuser);

    let richContentInner = document.createElement("div");
    let commentSpan = document.createElement("span");
    let button1 = document.createElement("button");
    let button2 = document.createElement("button");
    let button3 = document.createElement("button");
    let reply = document.createElement("div");


    let endIndex = keyuser.indexOf("+");
    commentSpan.innerHTML = keyuser.slice(3,endIndex) + ":  " + comment;

    button1.type = "button";
    button2.type = "button";
    button3.type = "button";
    button1.className = "MoreButton";
    button2.className = "MoreButton";
    button3.className = "MoreButton";
    button1.innerHTML = "置顶";
    button2.innerHTML = "删除";
    button3.innerHTML = "回复";

    button1.setAttribute("onclick", "return stickToTop(this)");
    button2.setAttribute("onclick", "return removeComment(this)");
    button3.setAttribute("onclick", "return replayComment(this)");

    reply.className = "reply";

    richContentInner.appendChild(commentSpan);
    richContentInner.appendChild(reply);
    richContentInner.appendChild(button1);
    richContentInner.appendChild(button2);
    richContentInner.appendChild(button3);

    richContentInner.className = "richContent-inner";
    richContentInner.id = keyuser;
    // console.log(richContentInner.childNodes.length);
    if(richContent.childNodes.length <= maxSize - 1){
        richContent.insertBefore(richContentInner, richContent.childNodes[0]);
    }

    $("graydiv").style.display="none";
    $("commentBlock1").style.display="none";
}

function tocancelquestion(){
    $("graydiv").style.display="none";
    $("questionblock1").style.display="none";
}

function tocancelcomment(){
    $("graydiv").style.display="none";
    $("commentBlock1").style.display="none";
}

function tocancelreply(){
    $("graydiv").style.display="none";
    $("replyBlock1").style.display="none";
}

function loginFail(){
    alert("抱歉，请登录后再使用该功能");
}

function init(){
    localStorage.setItem("queliutao 0.11","深圳大学举办临床医学发展论坛")
    localStorage.setItem("comzeran+0.3123 queliutao 0.11","深圳医疗发展应当秉承“肯付出，肯沉淀”的宗旨，通过长期努力的付出，高度重视中医思想，开拓新领域，方有可能在未来引领中国临床医学在一定领域的发展…");
    localStorage.setItem("comhuang+0.3122 queliutao 0.11","中国的医学发展真正要实现原创、要突破，应当高度重视中医思想。");
    localStorage.setItem("imgliutao 0.11","img/问题一.png");

    localStorage.setItem("queliutao 0.112","喜迎校友回母院，精诚合作促发展——数学与统计学院召开校友代表大会");
    localStorage.setItem("com张+0.312343 queliutao 0.112","学院校友会的成立是校友们的一件喜事、一件有意义的大事，对大会的召开表示热烈祝贺。");
    localStorage.setItem("imgliutao 0.112","img/问题二.png");

    localStorage.setItem("queliutao 0.113","凝心聚力 共促发展——李永华副校长带队访问校友企业");
    localStorage.setItem("comZign+0.312343 queliutao 0.113"," 校友与母校之间有着天然的、真挚的情感联系,校友和母校同频共振，广大校友以实际行动支持母校,已成为学校事业发展的重要支撑。");
    localStorage.setItem("imgliutao 0.113","img/问题三.png");

    localStorage.setItem("queliutao 0.114","活动回顾|2023届本科毕业设计答辩嘉年华成功举办");
    localStorage.setItem("com李老师+0.312343 queliutao 0.114","今年正值深圳大学40周年校庆，本届本科毕业设计答辩嘉年华的成功举办，为深圳大学的校庆氛围增光添彩，也给各位师生及嘉宾留下了珍贵的回忆。");
    localStorage.setItem("imgliutao 0.114","img/问题四.png");

    localStorage.setItem("queliutao 0.211","校庆40周年系列活动：电子与信息工程学院成功举办校友足球联谊赛");
    localStorage.setItem("comPaulKirby+4234423 queliutao 0.211","祝愿母校、祝愿学院发展得越来越好。");
    localStorage.setItem("comliutao+4234123 queliutao 0.211","中场休息时，电子与信息工程学院梁易达同学带来了精彩的表演《回到过去》《轨迹》，校友们追忆似水年华，回首昔日在深大的美好求学时光。带着祝愿，校友向师弟师妹赠送周边礼物。");
    localStorage.setItem("comaaa+4234123 queliutao 0.211","祝愿母校、祝愿学院发展得越来越好。");
    localStorage.setItem("imgliutao 0.211","img/问题五.png");

    localStorage.setItem("queliutao 0.212","传播学院举办杰出40周年校庆校友分享会");
    localStorage.setItem("comPaulKirby+4234423 queliutao 0.212","传媒是技术活，因此应该把专业化摆在首位。");
    localStorage.setItem("imgliutao 0.212","img/问题六.png");

    localStorage.setItem("queliutao 0.213","数字学术服务创新与发展研讨会暨CALIS第二十一届引进数据库培训周在深圳大学开幕");
    localStorage.setItem("comPaulKirby+4234423 queliutao 0.213","深圳大学在建校之初，就将图书馆的建设置于学校最中心、最重要的位置，意在体现深圳大学的学风、文化乃至管理和服务水平。随着人工智能技术的发展，传统大学教育将发生改变，图书馆在大学中的作用与角色也将随之发生改变，他希望深圳大学图书馆抓住机遇、转变思维，积极参与到数字学术过程及教育数字化转型工作中，加强数字资源建设与服务，在新时代新征程上、在一流大学建设中，继续发挥重要作用。");
    localStorage.setItem("imgliutao 0.213","img/问题七.png");

}

function initRec(){
    const tui = document.querySelector(".tui");
    const re = document.querySelector(".re");

    tui.addEventListener("click", () => {
        tui.classList.add("liis-active");
        re.classList.remove("liis-active");
    });

    re.addEventListener("click", () => {
        re.classList.add("liis-active");
        tui.classList.remove("liis-active");
    });

    //remove all que
    let questionSize = $("question1").childNodes.length;
    for(let i = 0; i < questionSize; i++){
        $("question1").childNodes[0].remove();
    }

    let count = 0;
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        if(key.slice(0,3) == "que") {
            updateQuestion(key, "");
            count++;
        }
        if(count >= 3) break;
    }

    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        if(key.slice(0,3) == "com") {
            updateComment(key, 2);
        }
    }

    console.log("aa");
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        if(key.slice(0,3) == "rep") {
            updateReply(key);
        }
    }
}

function searchque() {
    //remove all que
    let questionSize = $("question1").childNodes.length;
    for (let i = 0; i < questionSize; i++) {
        $("question1").childNodes[0].remove();
    }
    var search = $("search").value;

    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let content = localStorage.getItem(key);
        if (key.slice(0, 3) == "que") {
            if (content.toLowerCase().indexOf(search.toLowerCase()) != -1)
                updateQuestion(key, "");
        }
    }

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.slice(0, 3) == "com") {
            updateComment(key, 2);
        }
    }

    console.log("aa");
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.slice(0, 3) == "rep") {
            updateReply(key);
        }
    }
}

init();
updateAll();