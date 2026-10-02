import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';

export async function POST(req: Request) {
  try {
    const { prompt, vibe } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    // Fallback heuristic if no API key is set
    if (!apiKey) {
      const searchTerms = `${prompt || ''} ${vibe || ''}`.toLowerCase();
      
      const scored = PRODUCTS.map((product) => {
        let score = 0;
        product.styleTags.forEach(tag => {
          if (searchTerms.includes(tag.toLowerCase())) score += 2;
        });
        if (searchTerms.includes(product.category.toLowerCase())) score += 2;
        product.materials.forEach(mat => {
          if (searchTerms.includes(mat.toLowerCase())) score += 1;
        });
        return { product, score };
      });

      scored.sort((a, b) => b.score - a.score);
      const topPicks = scored.slice(0, 3).map(item => item.product);

      return NextResponse.json({
        recommendations: topPicks.map(p => ({
          productId: p.id,
          reason: `Hand-selected for your ${vibe || 'sustainable'} preference, emphasizing ${p.materials[0]}.`
        }))
      });
    }

    // OpenAI LLM recommendation logic
    const catalogSummary = PRODUCTS.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      materials: p.materials.join(', '),
      tags: p.styleTags.join(', '),
      description: p.description
    }));

    const systemPrompt = `You are an AI personal stylist for an ethical clothing brand.
Recommend 2 or 3 items from the catalog matching the user's aesthetic, vibe, and prompt.
Return ONLY valid JSON matching this schema:
[
  { "productId": "prod-1", "reason": "Specific styling and sustainability reason" }
]`;

    const userMessage = `User Request: "${prompt}"
Selected Vibe: "${vibe}"

Catalog:
${JSON.stringify(catalogSummary, null, 2)}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const rawContent = data.choices[0].message.content.replace(/```json|```/g, '').trim();
    const recommendations = JSON.parse(rawContent);

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Failed to generate recommendation' }, { status: 500 });
  }
}