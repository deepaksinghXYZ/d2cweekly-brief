'use client';

import { useState } from 'react';
import { PRODUCTS, Product } from '@/data/products';
import { Sparkles, ShoppingBag, Leaf } from 'lucide-react';

interface RecommendationResult {
  productId: string;
  reason: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [vibe, setVibe] = useState('minimalist');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, vibe })
      });
      const data = await res.json();
      setRecommendations(data.recommendations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const recommendedProducts = recommendations
    .map(r => ({
      product: PRODUCTS.find(p => p.id === r.productId),
      reason: r.reason
    }))
    .filter((item): item is { product: Product; reason: string } => Boolean(item.product));

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C332D]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E6E2D8] px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-700" />
            <span className="font-serif text-2xl font-bold tracking-tight">d2cweekly-brief</span>
          </div>
          <button className="relative p-2 bg-emerald-50 rounded-full text-emerald-800 hover:bg-emerald-100 transition">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-700 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* Hero Section */}
        <section className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            D2C Weekly Brief • AI Recommendation Experience
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal leading-tight">
            Curated style with zero environmental compromise.
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base">
            Describe your event, aesthetic, or desired fabrics. Our AI matches your intent with certified sustainable garments.
          </p>
        </section>

        {/* AI Form */}
        <section className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-[#E6E2D8] space-y-4">
          <form onSubmit={handleRecommend} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1 block">
                What are you styling for?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. An outdoor autumn gallery opening, minimalist, breezy, and comfortable..."
                rows={3}
                className="w-full p-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 font-medium">Vibe:</span>
                {['minimalist', 'casual', 'cozy', 'smart-casual'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setVibe(t)}
                    className={`text-xs px-3 py-1 rounded-full border transition ${
                      vibe === t
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-800 text-white rounded-xl text-sm font-medium hover:bg-emerald-900 transition disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                {loading ? 'Curating Recommendations...' : 'Find Matches'}
              </button>
            </div>
          </form>
        </section>

        {/* Recommendations */}
        {recommendedProducts.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <h2 className="text-2xl font-serif">AI Personalized Recommendations</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map(({ product, reason }) => (
                <div key={product.id} className="bg-white border border-emerald-300 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <img src={product.image} alt={product.name} className="h-64 w-full object-cover" />
                    <div className="p-5 space-y-3">
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                        {product.sustainabilityBadge}
                      </span>
                      <h3 className="font-medium text-lg text-neutral-900">{product.name}</h3>
                      <p className="text-xs text-neutral-600 italic bg-amber-50/70 p-2.5 rounded-lg border border-amber-100">
                        &ldquo;{reason}&rdquo;
                      </p>
                      <p className="text-xs text-neutral-500">{product.materials.join(' • ')}</p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 flex items-center justify-between">
                    <span className="text-lg font-semibold">${product.price}</span>
                    <button
                      onClick={() => setCartCount(c => c + 1)}
                      className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-medium hover:bg-emerald-900 transition"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Catalog */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif border-b border-neutral-200 pb-3">All Conscious Pieces</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((prod) => (
              <div key={prod.id} className="bg-white border border-[#E6E2D8] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <img src={prod.image} alt={prod.name} className="h-64 w-full object-cover" />
                  <div className="p-5 space-y-2">
                    <span className="text-xs text-emerald-700 font-semibold">{prod.sustainabilityBadge}</span>
                    <h3 className="font-medium text-base text-neutral-800">{prod.name}</h3>
                    <p className="text-xs text-neutral-500 line-clamp-2">{prod.description}</p>
                  </div>
                </div>
                <div className="p-5 pt-0 flex items-center justify-between">
                  <span className="font-semibold text-sm">${prod.price}</span>
                  <button
                    onClick={() => setCartCount(c => c + 1)}
                    className="px-3 py-1.5 border border-neutral-300 rounded-lg text-xs font-medium hover:bg-neutral-50 transition"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}