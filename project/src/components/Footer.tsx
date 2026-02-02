import { Film, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <Film className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold text-white">CineMentor</span>
          </div>
          <p className="text-slate-400 text-center max-w-2xl">
            Your complete guide to filmmaking. From your first script to your first premiere,
            we're here to help you bring your cinematic vision to life.
          </p>
          <div className="flex items-center space-x-2 text-slate-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>for filmmakers everywhere</span>
          </div>
          <div className="text-sm text-slate-500">
            2024 CineMentor. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
