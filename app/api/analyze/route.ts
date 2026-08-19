import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { customers } = await req.json();

    const prompt = `
You are an AI customer retention expert.

Analyze the customer dataset.

Return ONLY valid JSON.

The JSON MUST follow this format exactly:

{
  "summary": "Business-level summary",
  "customers": [
    {
      "name": "",
      "churnRisk": 0,
      "reason": "",
      "recommendation": "",
      "recommendedPartner": ""
    }
  ]
}

IMPORTANT:

The "recommendedPartner" field MUST ONLY be ONE of these categories:

- Marketing
- Customer Support
- CRM
- Loyalty Program
- Email Marketing
- Analytics
- Automation
- Social Media
- Customer Feedback
- Consulting

Do NOT invent company names.

Do NOT write explanations.

Do NOT write "Customer Support Team".

Do NOT write "TikTok Marketing Platform".

Only return ONE category from the list above.

The "recommendation" field should explain why that category would help.

Customer Data:

${JSON.stringify(customers)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text!
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(text);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Analysis failed",
      },
      { status: 500 }
    );
  }
}
