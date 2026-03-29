import { GoogleGenerativeAI, Tool, FunctionDeclaration, SchemaType } from "@google/generative-ai";
import { getSchemaAsText } from "./schemaReader";

// ใส่ API Key ของ Gemini 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Tool definition ที่ส่งให้ AI รู้จัก
const tools: Tool[] = [
  {
    functionDeclarations: [
      {
        name: "query",
        description: "Query the database using Prisma. Use this to retrieve data.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            model: {
              type: SchemaType.STRING,
              description: "The Prisma model name (e.g., User, Order)",
            },
            action: {
              type: SchemaType.STRING,
              description: "The Prisma action: findMany, findFirst, findUnique, count",
            },
            args: {
              type: SchemaType.OBJECT,
              description: "Prisma query arguments (where, select, orderBy, take, skip)",
              properties: {},
            },
          },
          required: ["model", "action"],
        },
      } as FunctionDeclaration,
    ],
  },
];

export async function askAI(userMessage: string): Promise<string> {
  const schemaText = getSchemaAsText();
  
  // สร้าง Prompt เพื่อกำหนดบทบาทและกฎให้ AI
  const systemInstruction = `You are an AI assistant that helps users query a database.

You have access to the following database schema:
${schemaText}

Rules:
Always use the "query" tool to retrieve data. Never answer from memory.
Never write raw SQL.
Only use the models and fields defined in the schema above.
Keep responses concise and in the same language as the user's message.`.trim();

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction,
    tools,
  });

  const chat = model.startChat();
  let response = await chat.sendMessage(userMessage);

  // Handle function call loop: ตรวจสอบว่า AI ต้องการเรียก Tool หรือไม่
  while (response.response.functionCalls()?.length) {
    const calls = response.response.functionCalls()!;
    const { runQuery } = await import("../tools/queryTool"); // ดึง runQuery มาใช้งาน

    const results = await Promise.all(
      calls.map(async (call) => {
        const args = call.args as Record<string, unknown>;
        
        // สั่งทำงาน query ที่ AI ขอมา
        const result = await runQuery(args); 
        
        // ส่งผลลัพธ์กลับในรูปแบบที่ Gemini ต้องการ
        return {
          functionResponse: {
            name: call.name,
            response: { result }, 
          },
        };
      })
    );

    // ส่งข้อมูลจาก Database กลับไปให้ AI สรุปผล
    response = await chat.sendMessage(results);
  }

  // ส่งคำตอบสุดท้ายที่ AI สรุปให้แล้วกลับไป
  return response.response.text();
}