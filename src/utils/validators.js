// 密码验证正则
// 1.密码必须由字母、数字、特殊符号组成，区分大小写
// 2.特殊符号包含（. _ ~ ! @ # $ ^ & *）
// 3.密码长度为8-20位
const pwdReg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{8,20}$/;
// 验证名字
export const validateName = (rule, value, callback) => {
    if (!value) {
        callback(new Error('名字不能为空'));
    } else {
        callback();
    }
};
// 验证密码
export const validatePWD = (rule, value, callback) => {

    if (!value) {
        callback(new Error('请输入密码'));
    } else if (!pwdReg.test(value)) {
        callback(new Error('请按照规范填写密码！'));
    } else {
        callback();
    }
};