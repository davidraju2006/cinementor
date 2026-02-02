import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { beginnerLessons } from "../data/learnBeginner";
import { intermediateLessons } from "../data/learnIntermediate";
import { advancedLessons } from "../data/learnAdvanced";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LessonView() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const allLessons = [...beginnerLessons, ...intermediateLessons, ...advancedLessons];
  const lesson = allLessons.find(
    (l) => l.id === lessonId
  );

  const isIntermediate = intermediateLessons.some(l => l.id === lessonId);
  const isAdvanced = advancedLessons.some(l => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Lesson Not Found</h2>
          <p className="text-slate-400 mb-6">The lesson you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/learn")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Learning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/learn")}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Learning</span>
            </button>
            <div className="text-sm text-slate-400">
              {isAdvanced ? "Advanced Course" : isIntermediate ? "Intermediate Course" : "Beginner Course"}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {lesson.title}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
        </div>

        {/* Lesson Content */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mb-6 text-white border-b border-slate-600 pb-3">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mb-4 text-blue-400 mt-8">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mb-3 text-cyan-400 mt-6">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-slate-300 leading-relaxed mb-4 text-lg">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="text-slate-300 mb-6 space-y-2">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{children}</span>
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-6 my-6 italic text-slate-400 bg-slate-800/50 p-4 rounded-r-lg">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-slate-700 px-2 py-1 rounded text-sm font-mono text-cyan-300">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-slate-900 border border-slate-600 rounded-lg p-6 overflow-x-auto my-6 text-sm">
                    {children}
                  </pre>
                ),
                hr: () => (
                  <hr className="border-slate-600 my-8" />
                ),
              }}
            >
              {lesson.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Completion Section */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-bold text-white mb-4">
            Lesson Complete!
          </h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Great job completing this lesson. Practice what you've learned and move on to the next topic when you're ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all">
              Mark as Completed ✓
            </button>
            <button
              onClick={() => navigate("/learn")}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
