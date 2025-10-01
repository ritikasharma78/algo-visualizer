import React, { useState } from 'react';
import { RotateCcw, Trash2, Plus, X } from 'lucide-react';

export default function ArrayVisualizer() {
  const [array, setArray] = useState([5, 3, 8, 1, 9, 2, 7, 4, 6]);
  const [animating, setAnimating] = useState(false);
  const [highlighted, setHighlighted] = useState([]);
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [speed, setSpeed] = useState(500);
  const [currentOperation, setCurrentOperation] = useState('');
  const [createMode, setCreateMode] = useState(false);
  const [newArrayInput, setNewArrayInput] = useState('');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const operations = {
    create: {
      code: `// Create array
let arr = [5, 3, 8, 1, 9];`,
      time: 'O(n)',
      space: 'O(n)'
    },
    insert: {
      code: `// Insert at index
arr.splice(index, 0, value);`,
      time: 'O(n)',
      space: 'O(1)'
    },
    delete: {
      code: `// Delete at index
arr.splice(index, 1);`,
      time: 'O(n)',
      space: 'O(1)'
    },
    reverse: {
      code: `// Reverse array
for (let i = 0; i < n/2; i++) {
  let j = n - 1 - i;
  [arr[i], arr[j]] = [arr[j], arr[i]];
}`,
      time: 'O(n)',
      space: 'O(1)'
    }
  };

  const handleCreateArray = () => {
    if (animating) return;
    setCreateMode(true);
    setArray([]);
    setNewArrayInput('');
    setCurrentOperation('create');
  };

  const handleAddToArray = () => {
    if (newArrayInput.trim() === '') return;
    const val = parseInt(newArrayInput.trim());
    if (!isNaN(val)) {
      setArray([...array, val]);
      setNewArrayInput('');
    }
  };

  const handleFinishCreate = () => {
    setCreateMode(false);
  };

  const handleInsert = async () => {
    if (animating || !value || index === '') return;
    setAnimating(true);
    setCurrentOperation('insert');
    
    const idx = parseInt(index);
    const val = parseInt(value);
    
    if (isNaN(idx) || isNaN(val) || idx < 0 || idx > array.length) {
      alert('Invalid index or value');
      setAnimating(false);
      return;
    }

    setHighlighted([idx]);
    await sleep(speed);

    const newArray = [...array.slice(0, idx), val, ...array.slice(idx)];
    setArray(newArray);
    
    setHighlighted([idx]);
    await sleep(speed);
    
    setHighlighted([]);
    setAnimating(false);
    setValue('');
    setIndex('');
  };

  const handleDelete = async () => {
    if (animating || index === '' || array.length === 0) return;
    setAnimating(true);
    setCurrentOperation('delete');
    
    const idx = parseInt(index);
    
    if (isNaN(idx) || idx < 0 || idx >= array.length) {
      alert('Invalid index');
      setAnimating(false);
      return;
    }

    setHighlighted([idx]);
    await sleep(speed);

    const newArray = array.filter((_, i) => i !== idx);
    setArray(newArray);
    
    await sleep(speed);
    setHighlighted([]);
    setAnimating(false);
    setIndex('');
  };

  const handleReverse = async () => {
    if (animating || array.length === 0) return;
    setAnimating(true);
    setCurrentOperation('reverse');
    
    const n = array.length;
    const newArray = [...array];
    
    for (let i = 0; i < Math.floor(n / 2); i++) {
      const j = n - 1 - i;
      
      setHighlighted([i, j]);
      await sleep(speed);
      
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      setArray([...newArray]);
      
      await sleep(speed);
    }
    
    setHighlighted([]);
    setAnimating(false);
  };

  const handleClear = () => {
    if (animating) return;
    setArray([]);
    setHighlighted([]);
    setValue('');
    setIndex('');
    setCreateMode(false);
    setCurrentOperation('');
  };

  const generateRandom = () => {
    if (animating) return;
    const size = Math.floor(Math.random() * 10) + 5;
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 99) + 1);
    setArray(newArray);
    setHighlighted([]);
    setCreateMode(false);
    setCurrentOperation('create');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">Array Visualizer</h1>
        <p className="text-purple-200 text-center mb-8">Interactive Data Structure Visualization</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Array Display - Center Stage */}
          <div className="lg:col-span-2 space-y-6">
            {/* Array Visualization */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 shadow-2xl min-h-[300px] flex items-center justify-center">
              <div className="w-full">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {array.length === 0 && !createMode ? (
                    <div className="text-purple-300 text-lg text-center">
                      Array is empty. Create an array to start.
                    </div>
                  ) : createMode ? (
                    <div className="w-full text-center space-y-4">
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        {array.map((val, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-2">
                            <div className="w-20 h-20 flex items-center justify-center text-white font-bold text-2xl rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 border-2 border-blue-400">
                              {val}
                            </div>
                            <div className="text-purple-300 text-sm font-mono bg-slate-700/50 px-2 py-1 rounded">
                              [{idx}]
                            </div>
                          </div>
                        ))}
                        <div className="w-20 h-20 flex items-center justify-center rounded-lg border-2 border-dashed border-purple-400">
                          <Plus className="text-purple-400" size={32} />
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 mt-4">
                        <input
                          type="number"
                          placeholder="Enter value"
                          value={newArrayInput}
                          onChange={(e) => setNewArrayInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddToArray()}
                          className="w-32 bg-slate-700 text-white px-3 py-2 rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={handleAddToArray}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium"
                        >
                          Add
                        </button>
                        <button
                          onClick={handleFinishCreate}
                          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all font-medium"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  ) : (
                    array.map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div
                          className={`w-20 h-20 flex items-center justify-center text-white font-bold text-2xl rounded-lg transition-all duration-300 border-2 ${
                            highlighted.includes(idx)
                              ? 'bg-gradient-to-br from-pink-500 to-purple-600 border-pink-400 shadow-lg shadow-purple-500/50 scale-110'
                              : 'bg-gradient-to-br from-blue-600 to-cyan-600 border-blue-400'
                          }`}
                        >
                          {val}
                        </div>
                        <div className="text-purple-300 text-sm font-mono bg-slate-700/50 px-2 py-1 rounded">
                          [{idx}]
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {!createMode && array.length > 0 && (
                  <div className="text-center text-purple-300 text-sm mt-6">
                    Array Size: {array.length} elements
                    {animating && <span className="text-pink-400 font-semibold ml-4">● Animating...</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Code Snippet and Complexity */}
            {currentOperation && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-white font-semibold mb-3 text-lg">Code & Complexity</h3>
                <div className="bg-slate-900/80 rounded-lg p-4 mb-4 font-mono text-sm text-green-400">
                  <pre>{operations[currentOperation].code}</pre>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-purple-300 text-xs mb-1">Time Complexity</div>
                    <div className="text-white font-semibold text-lg">{operations[currentOperation].time}</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-purple-300 text-xs mb-1">Space Complexity</div>
                    <div className="text-white font-semibold text-lg">{operations[currentOperation].space}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Operations Panel - Right Side */}
          <div className="space-y-4">
            {/* Create */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
              <h3 className="text-white font-semibold mb-3 text-lg">Create Array</h3>
              <div className="space-y-2">
                <button
                  onClick={handleCreateArray}
                  disabled={animating || createMode}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  Create Empty
                </button>
                <button
                  onClick={generateRandom}
                  disabled={animating || createMode}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  Generate Random
                </button>
              </div>
            </div>

            {/* Insert */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
              <h3 className="text-white font-semibold mb-3 text-lg">Insert Element</h3>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  disabled={animating || createMode}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none disabled:opacity-50"
                />
                <input
                  type="number"
                  placeholder="Index"
                  value={index}
                  onChange={(e) => setIndex(e.target.value)}
                  disabled={animating || createMode}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={handleInsert}
                  disabled={animating || !value || index === '' || createMode}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  Insert
                </button>
              </div>
            </div>

            {/* Delete */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
              <h3 className="text-white font-semibold mb-3 text-lg">Delete Element</h3>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Index"
                  value={index}
                  onChange={(e) => setIndex(e.target.value)}
                  disabled={animating || createMode}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={handleDelete}
                  disabled={animating || index === '' || createMode}
                  className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-3 rounded-lg hover:from-red-600 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Reverse */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
              <h3 className="text-white font-semibold mb-3 text-lg">Reverse Array</h3>
              <button
                onClick={handleReverse}
                disabled={animating || array.length === 0 || createMode}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-3 rounded-lg hover:from-orange-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                Reverse
              </button>
            </div>

            {/* Clear */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
              <h3 className="text-white font-semibold mb-3 text-lg">Clear Array</h3>
              <button
                onClick={handleClear}
                disabled={animating}
                className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white px-4 py-3 rounded-lg hover:from-slate-700 hover:to-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Clear
              </button>
            </div>

            {/* Speed Control */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-semibold text-sm">Speed</label>
                <span className="text-purple-300 font-mono text-sm">{speed}ms</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                disabled={animating}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-purple-300 mt-1">
                <span>Fast</span>
                <span>Slow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}