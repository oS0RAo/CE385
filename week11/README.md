seed.ts
ทำงานผ่าน npx prisma db seed มีลูป for ทำงานซ้ำ 5 รอบ เพื่อจำลองข้อมูลสร้าง User 5 คน และ Order 5 รายการ ยัดลงไปใน Database

queryTool.ts
ฟังก์ชัน runQuery(input: unknown) ที่รับค่า input ที่เป็นอะไรก็ได้ซึ่งจะเป็นคำสั่งที่ AI ส่งมาให้โดยนำ input ไปผ่าน QueryInputSchema.parse(input) เพื่อกรองว่า AI ส่งข้อมูลมาถูกฟอร์แมตไหมทำงานตารางที่อนุญาตไหม และสั่ง action ที่ปลอดภัยไหมห้ามสั่งลบ หรือแก้ไข ต่อมาจะเลือกเป้าหมายผ่าน prisma[model.toLowerCase()] เป็นการเลือกว่าจะใช้ prisma.user หรือ prisma.order ตามที่ AI สั่งมา
และสั่งรันคำสั่ง Database จริงๆ ผ่าน prismaModel[action](args)

schemaReader.ts
ฟังก์ชัน readPrismaSchema() ฟังก์ชันนี้เอาไว้ดูไฟล์ schema.prisma เพื่อให้รู้ว่าเรามีฐานข้อมูลแบบไหนโดยใช้ fs.readFileSync 
เพื่อเปิดอ่านไฟล์ schema.prisma ทั้งหมดออกมาโดยใช้ Regex (/model\s+(\w+)\s*\{([^}]+)\}/g) ในการหา model ... { ... }
เมื่อเจอแต่ละ model มันจะตัดเอาเฉพาะบรรทัดที่เป็นชื่อคอลัมน์ออกมาแล้วเอาไปเก็บไว้ใน Array โดยการคืนค่าจะส่งคืนเป็น Array เช่น [{ name: 'User', fields: ['id', 'email', 'name'] }]

ฟังก์ชัน getSchemaAsText() การทำงานด้านในจะนำผลลัพธ์ที่เป็น Array จาก readPrismaSchema() มาแปลงให้เป็นข้อความเรียงกันสวยๆ 
เพื่อเตรียมเอาไปให้ AI อ่าน

llm.ts
ฟังก์ชัน askAI(userMessage: string) คือฟังก์ชันจัดการการคุยโต้ตอบระหว่าง ผู้ใช้ > AI > Database
โดยรับค่า Input คำถามจากผู้ใช้ โดยเอาข้อความจาก getSchemaAsText() มาประกอบเป็นคำสั่งตั้งต้น เพื่อบอกข้อมูลพื้นฐานให้ AI
ต่อมาใช้คำสั่ง chat.sendMessage(userMessage) เพื่อส่งคำถามไปหา Gemini และใช้ลูปจัดการ while (response.response.functionCalls()?.length)
โดยดึง runQuery มาใช้งานร่วมด้วย พอได้ข้อมูลมาก็จะนำข้อมูลนั้นส่งกลับไปให้ AI อีกรอบผ่าน chat.sendMessage(results) ซึ่งAI 
จะเอาข้อมูลนั้นมาสรุปเป็นภาษาคน แล้วส่งกลับมาเป็นคำตอบสุดท้าย