import React from 'react';

const stats = [
  { label: 'Trained Developers', value: '1,500+' },
  { label: 'Student Rating', value: '4.9 / 5' },
  { label: 'Internship Track', value: '100%' },
  { label: 'Hiring Partners', value: '50+' },
];

export default function StatsSection() {
  return (
    <section className="bg-slate-900 border-y border-slate-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400">{stat.value}</p>
              <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}