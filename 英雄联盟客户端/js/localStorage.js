//1.获取已记住的账号
function getUsersName(){
    if(localStorage.getItem("usersName")){
        return JSON.parse(localStorage.getItem("usersName"));
    }else{
        return [];
    }
}
//2.添加已记住的账号
function appendUsersName(name){
    var usersName = getUsersName();
    if(usersName.indexOf(name)<0){
        usersName.push(name);
    }
    localStorage.setItem("usersName",JSON.stringify(usersName));
}
//3.删除已记住的账号
function delUsersName(name){
    var usersName = getUsersName();
    if(usersName.indexOf(name)>-1){
        var index = usersName.indexOf(name);
        usersName.splice(index,1);
    }
    localStorage.setItem("usersName",JSON.stringify(usersName));
}
