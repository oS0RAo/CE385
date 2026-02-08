Workshop 3.1
สร้าง Module operation.js สำหรับสร้างฟังก์ชันชื่อ operation ที่รับพารามิเตอร์ 3 ตัวคือ type, a, และ b
ภายในฟังก์ชันใช้ if else-if else ในการกำหนดเงื่อนไขเพื่อตรวจสอบค่า type ว่าเป็น add, subtract, multiply, หรือ divide แล้วทำการคำนวณตามเงื่อนไข
จากนั้นใช้คำสั่ง module.exports = operation; เพื่อส่งออกฟังก์ชันนี้ให้ไฟล์อื่นเรียกใช้
ต่อมาจะเรียกใช้ Module operation.js ใน index.js
โดยใช้คำสั่ง require('./operation') เพื่อนำเข้าฟังก์ชันจากไฟล์ operation.js
จากนั้นเมื่อเรียกฟังก์ชันและใส่ค่า type ต่างๆก็จะคืนค่าผลลัพธ์ที่คำนวนแล้วออกมา

Workshop 3.2
โดย Callback Function (fetchDataWithCallback) ซึ่งฟังก์ชันนี้จะรับ callback เป็นพารามิเตอร์ โดย setTimeout ตั้งdelayไว้ 2 วินาที
และเมื่อครบเวลาก็จะเรียกใช้ฟังก์ชัน callback() และส่งข้อมูลกลับไป
Promise Object (fetchDataWithPromise) ฟังก์ชันนี้คืนค่าเป็น Object ประเภท Promise ทันทีโดยภายใน Promise จะมีสถานะ resolve สำเร็จ หรือ reject ล้มเหลว
โดยเมื่อครบ 2 วินาที จะเรียก resolve() เพื่อบอกว่างานสำเร็จและส่งข้อมูลออกมา และใช้ .then() เพื่อรับค่าเมื่อสำเร็จ และ .catch() เพื่อรับค่าเมื่อเกิดข้อผิดพลาด

Workshop 3.3
สร้างฟังก์ชั่น simulateAsyncOperation ที่รับค่า timeout เข้ามาจากนั้นสร้างเงื่อนไขโดยหาก timeout < 1000 ให้ทำการ Reject แต่ถ้ามากกว่าให้ Resolve
สร้างฟังก์ชั่น performAsyncTask ที่ใช้ async/await เพื่อสั่งให้โปรแกรมรอจนกว่าผลลัพธ์จะส่งกลับมาก่อนที่จะทำบรรทัดถัดไป และใช้ Try/Catch ในการจัดการ error
Try ถ้า Promise Resolve ค่าจะถูกเก็บในตัวแปร result
Catch ถ้า Promise ถูก Reject การทำงายจะกระโดดมาทำใน catch ทันที

Workshop 3.4
สร้างฟังก์ชั่นสำหรับจำลองสถานการณ์ที่มี Server หลายตัวและต้องการดึงข้อมูลพร้อมกันซึ่งมีฟังก์ชันจำลอง Server 3อัน
Server 1: สำเร็จใน 2 วินาที
Server 2: ล้มเหลว ใน 1 วินาที
Server 3: สำเร็จใน 3 วินาที
โดยเคสแรกจะต้องการเอาตัวที่สำเร็จตัวแรกซึ่งจะใช้ Promise.any([fetchDataFromServer1(), fetchDataFromServer2(), fetchDataFromServer3(),])
โดยการทำงานแม้ Server 2 จะตอบกลับมาเร็วสุดแต่มันจะ Error เพราะ Promise.any จะข้ามไป และรอ Server 1 ที่สำเร็จใน 2วินาทีแทนผลลัพธ์เลยได้ข้อมูลจาก Server 1 มา

 เคส 2 เอาผลลัพธ์ทั้งหมด(Promise.allSettled) โดยการทำงานจะรอให้ทำงานจนครบทุกตัวแล้วคืนค่ากลับมาเป็น Array ของ Object