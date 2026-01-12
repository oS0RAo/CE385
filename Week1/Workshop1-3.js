//กำหนดตัวแปรคะแนนแต่ละวิชา
let math = 85;
let sci = 72;
let eng = 90;

//คำนวณคะแนนรวม และคำนวณหาค่าเฉลี่ย
let total_score = math + sci + eng;
let average_score = total_score / 3;

//แสดงผลผ่านconsole
console.log("Total score:", total_score);
console.log("Average score:", average_score.toFixed(2)); //ใช้ .toFixed(2) เพื่อให้แสดงทศนิยม2ตำแหน่ง
console.log("Average score >= 80:", average_score >= 80);//ตรวจสอบว่าคะแนนเฉลี่ยมากกว่า80มั้ย