GET /users/email/:email
การทำงานจะดึงข้อมูลผู้ใช้โดยใช้อีเมลเป็นเงื่อนไขในการค้นหา โดยจะรับค่า email ใน URL (req.params) จากนั้นใช้คำสั่ง prisma.user.findUnique เพื่อค้นหาข้อมูลในตาราง User ที่มีอีเมลตรงกัน 
หากพบข้อมูล จะส่งกลับเป็น JSON (Status 200) แต่ถ้าไม่พบ จะส่งข้อความแจ้งเตือน Error (Status 404)

DELETE /users/:id
การทำงานจะลบข้อมูลผู้ใช้ออกจากฐานข้อมูลโดยรับค่า id จาก URL (req.params) และใช้ใช้คำสั่ง prisma.user.delete โดยอ้างอิง id จาก Primary Key Userid 
เมื่อลบสำเร็จ จะส่งข้อความยืนยันการลบพร้อมข้อมูลที่ถูกลบกลับไป (Status 200)

POST /posts
สร้าง Post ใหม่โดยรับค่า title, content, และ authorId จาก URL (req.body) จากนั้นใช้คำสั่ง prisma.post.create เพื่อนำข้อมูลไปบันทึกลงตาราง Post
โดยข้อมูลที่บันทึกสำเร็จจะถูกส่งกลับมาแสดงผล (Status 201 Created)

GET /posts
ดึงข้อมูลบ Post ทั้งหมดที่มีในระบบโดยใช้คำสั่ง prisma.post.findMany() ดึงข้อมูลทั้งหมดจากตาราง Post จากนั้นส่งข้อมูลทั้งหมดกลับไปในรูปแบบ Array ของ JSON (Status 200)

GET /posts/:id
ดึงข้อมูล Post แบบเจาะจง 1 อันโดยรับค่า id ของโพสต์จาก URL (req.params) โดยใช้คำสั่ง prisma.post.findUnique โดยค้นหาจาก postId
หากพบข้อมูล จะส่งกลับเป็น JSON (Status 200) แต่ถ้าไม่พบ จะส่งสถานะ 404 Not Found

PUT /posts/:id
อัปเดตหรือแก้ไขข้อมูล Post โดยรับค่า id ของโพสต์เป้าหมายจาก URL (req.params) โดยรับค่าชุดข้อมูลใหม่ (title, content, published) จาก Body (req.body)
จากนั้นใช้คำสั่ง prisma.post.update เพื่อค้นหาโพสต์ตาม postId และทำการเขียนทับข้อมูลใหม่ลงไปโดยส่งข้อมูลโพสต์ที่ถูกอัปเดตแล้วกลับไป (Status 200)

DELETE /posts/:id
ลบ Post ออกจากระบบโดยรับค่า id ของโพสต์จาก URL (req.params) จากนั้นใช้คำสั่ง prisma.post.delete โดยค้นหาเป้าหมายจาก postId แล้วทำการลบข้อมูลนั้นทิ้ง
จากนั้นจะส่งข้อความยืนยันพร้อมข้อมูลที่ถูกลบกลับไป (Status 200)
