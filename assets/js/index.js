$(function() {

        getUserInfo();

        $("#btnLogout").on("click", function() {
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something
                // 1. 清空本地存储中的 token
                localStorage.removeItem('token');
                // 2. 重新跳转到登录页面
                location.href = '/login.html';
                // 关闭 confirm 询问框
                layer.close(index);
            })

        })




    })
    //获取用户基本信息
function getUserInfo() {

    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        //headers请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        seccess: function(res) {
            console.log(res);
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败');
            renderAvatar(res.data);
        },
        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function(res) {
        //     if (res.status === 1 && res.message === '身份证认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }
    })
}
//渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    //设置欢迎文本
    $("#welcome").html("欢迎&nbsp&nbsp" + name);
    //按需渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $(".laui-nav-img").attr('src', user_pic);
        $(".text-avatar").hied();
    } else {
        //渲染文本头像
        $(".laui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}