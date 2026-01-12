let userName = "admin";
let passWord = "1234";
let age = 18;

if(userName == "admin" && passWord == "1234" && age >= 18){
    console.log("Log in Success!!!")//ถ้าเงื่อนไขถูกต้องให้แสดงLog in Success!!!
} else if (userName !== "admin" || passWord !== "1234"){
    console.log("username or password is incorrect!!!")//แต่ถ้าUsernameหรือpasswordผิดให้แสดงusername or password is incorrect!!!
} else if(age < 18){
    console.log("underage!!!")//ถ้าอายุไม่ถึง18ให้แสดงunderage!!!
}

console.log("\nother cordition")

//Test 2 กรณี Username หรือ Password ผิด
let user2 = "User";
let pass2 = "1234";
let age2 = 25;

console.log("\nTest 2:");

if (user2 === "admin" && pass2 === "1234" && age2 >= 18) {
    console.log("Log in Success!!!");
} else if (user2 !== "admin" || pass2 !== "1234") {
    console.log("username or password is incorrect!!!");
}else if (age3 < 18) {
    console.log("underage!!!");
}

//Test 3 กรณีข้อมูลถูกแต่อายุไม่ถึง
let user3 = "admin";
let pass3 = "1234";
let age3 = 15;

console.log("\nTest 3:");

if (user3 === "admin" && pass3 === "1234" && age3 >= 18) {
    console.log("Log in Success!!!");
} else if (user3 !== "admin" || pass3 !== "1234") {
    console.log("username or password is incorrect!!!");
} else if (age3 < 18) {
    console.log("underage!!!");
}