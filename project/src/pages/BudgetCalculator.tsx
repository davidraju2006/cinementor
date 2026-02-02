import { useState } from 'react';

export default function BudgetCalculator() {
  const [shootDays, setShootDays] = useState(5);
  const [crewSize, setCrewSize] = useState(10);
  const [equipmentCost, setEquipmentCost] = useState(5000);
  const [locationCount, setLocationCount] = useState(3);

  // Calculations
  const preProduction = 5000; // Fixed
  const production = shootDays * 1000 + crewSize * 200 + locationCount * 300 + equipmentCost;
  const postProduction = production * 0.25;
  const subtotal = preProduction + production + postProduction;
  const contingency = subtotal * 0.1;
  const total = subtotal + contingency;

  return (
    <div className="min-h-screen py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Budget Calculator
          </h1>
          <p className="text-xl text-slate-400">
            Estimate your film production costs with our interactive calculator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Production Inputs</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Shoot Days
                </label>
                <input
                  type="number"
                  value={shootDays}
                  onChange={(e) => setShootDays(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Crew Size
                </label>
                <input
                  type="number"
                  value={crewSize}
                  onChange={(e) => setCrewSize(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Equipment Cost ($)
                </label>
                <input
                  type="number"
                  value={equipmentCost}
                  onChange={(e) => setEquipmentCost(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Number of Locations
                </label>
                <input
                  type="number"
                  value={locationCount}
                  onChange={(e) => setLocationCount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                  min="1"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Budget Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-300">Pre-Production</span>
                <span className="text-white">${preProduction.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Production</span>
                <span className="text-white">${production.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Post-Production</span>
                <span className="text-white">${postProduction.toLocaleString()}</span>
              </div>
              <hr className="border-slate-600" />
              <div className="flex justify-between">
                <span className="text-slate-300">Subtotal</span>
                <span className="text-white">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Contingency (10%)</span>
                <span className="text-white">${contingency.toLocaleString()}</span>
              </div>
              <hr className="border-slate-600" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-white">Total Estimate</span>
                <span className="text-emerald-400">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-slate-400 text-sm">
            This is an estimate based on industry averages. Actual costs may vary.
          </p>
        </div>
      </div>
    </div>
  );
}
