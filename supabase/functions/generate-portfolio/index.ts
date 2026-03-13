import "jsr:@supabase/functions-js/edge-runtime.d.ts";

/**
 * Supabase Edge Function: generate-portfolio
 * Proxy for Google Gemini AI to generate structured portfolio content.
 */

Deno.serve(async (req) => {
  // 1. Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      } 
    });
  }

  try {
    const { name, role, skills, projects, github } = await req.json();
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const prompt = `
      Create a professional developer portfolio in JSON format.
      
      User Details:
      Name: ${name}
      Role: ${role}
      Known Skills: ${skills}
      Key Projects: ${projects}
      GitHub: ${github}

      Return EXACTLY this JSON structure:
      {
        "tagline": "A short, punchy professional tagline",
        "about": "A compelling 2-3 sentence professional bio",
        "skills": ["List of 6-8 relevant technologies"],
        "hero_image": "A descriptive keyword for a high-quality Unsplash image related to their role (e.g., 'abstract coding', 'minimalist desk', 'creative workspace')",
        "projects": [
          {
            "title": "Project Name",
            "description": "1 sentence description",
            "tech": ["Tech 1", "Tech 2"],
            "image_keyword": "A keyword for a project-related image (e.g., 'dashboard', 'mobile app', 'website layout')"
          }
        ]
      }
      
      Ensure the tone is professional, modern, and high-impact.
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            response_mime_type: "application/json",
        }
      })
    });

    const result = await response.json();
    const content = result.candidates[0].content.parts[0].text;

    return new Response(content, {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
});
