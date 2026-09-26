import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, ShieldAlert, Share2 } from 'lucide-react';
import { DoctorConfig, ArticleItem } from '../config/doctorConfig';

interface KnowledgeCenterSectionProps {
  config: DoctorConfig;
}

export const KnowledgeCenterSection: React.FC<KnowledgeCenterSectionProps> = ({ config }) => {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  return (
    <section className="py-20 md:py-28 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 inline-block mb-3">
            Patient Education
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Neurology & Neurophysiology Insights
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Educational articles and diagnostic guides to help patients and families understand neuro-diagnostic procedures.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {config.articles.map((article) => (
            <article
              key={article.id}
              className="bg-[#FAFAFC] hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-teal-500/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Quiet unboxed metadata */}
                <div className="flex items-center gap-2 text-xs text-teal-700 font-medium mb-3">
                  <span>{article.category}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-[11px] text-slate-400 font-mono">
                  Educational
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-teal-700 font-semibold mb-3">
              <span>{selectedArticle.category}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500">{selectedArticle.readTime}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-400">{selectedArticle.publishedDate}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
              {selectedArticle.title}
            </h3>

            {/* Educational Disclaimer */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-6 flex items-start gap-2.5 text-xs text-slate-600">
              <ShieldAlert className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>Educational Notice: </strong>
                This article is provided for patient education and informational purposes only. It does not constitute individual medical diagnosis or treatment advice. Consult with a qualified physician regarding any personal symptoms.
              </span>
            </div>

            {/* Article Prose Content */}
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              {selectedArticle.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Author: Clinical Educational Team · Dr. Awais Ahmad
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
