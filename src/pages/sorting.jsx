import React, { useEffect, useMemo, useRef, useState } from "react";

// Utility to sleep respecting speed slider
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const BAR_MIN = 10;
const BAR_MAX = 200;

export default function Sorting() {
  // Data
  const [arr, setArr] = useState([]);
  const [speed, setSpeed] = useState(50); // 0..100
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]); // indices being compared / swapped
  const [sortedBoundary, setSortedBoundary] = useState(-1); // optional paint

  // Controls inputs
  const [userInputArray, setUserInputArray] = useState("");
  const [showInputModal, setShowInputModal] = useState(false);

  const delay = useMemo(() => (101 - speed) * 5, [speed]); // 5..505ms

  const resetHighlights = () => {
    setActiveIndices([]);
    setSortedBoundary(-1);
  };

  // Create from user input
  const openUserInput = () => setShowInputModal(true);
  const createFromUserInput = () => {
    const parsed = userInputArray
      .split(",")
      .map((x) => parseInt(x.trim()))
      .filter((x) => !isNaN(x));
    if (parsed.length) setArr(parsed.map(clampBar));
    setUserInputArray("");
    setShowInputModal(false);
  };

  const clampBar = (v) => Math.min(Math.max(v, BAR_MIN), BAR_MAX);

  // Random array
  const randomize = () => {
    const n = Math.floor(Math.random() * 20) + 10; // 10..29
    const a = Array.from(
      { length: n },
      () => Math.floor(Math.random() * (BAR_MAX - BAR_MIN + 1)) + BAR_MIN
    );
    setArr(a);
    resetHighlights();
  };

  // Visual helpers
  const setCompare = async (i, j) => {
    setActiveIndices([i, j]);
    await wait(delay);
  };
  const updateArray = async (next) => {
    setArr(next);
    await wait(delay);
  };

  // Sorting Algorithms (animated)
  const bubbleSort = async () => {
    setIsSorting(true);
    resetHighlights();
    const a = [...arr];
    for (let i = 0; i < a.length - 1; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        await setCompare(j, j + 1);
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          await updateArray([...a]);
        }
      }
      setSortedBoundary(a.length - i - 1);
    }
    resetHighlights();
    setIsSorting(false);
  };

  const insertionSort = async () => {
    setIsSorting(true);
    resetHighlights();
    const a = [...arr];
    for (let i = 1; i < a.length; i++) {
      let key = a[i];
      let j = i - 1;
      while (j >= 0 && a[j] > key) {
        await setCompare(j, j + 1);
        a[j + 1] = a[j];
        j--;
        await updateArray([...a]);
      }
      a[j + 1] = key;
      await updateArray([...a]);
      setSortedBoundary(i);
    }
    resetHighlights();
    setIsSorting(false);
  };

  const selectionSort = async () => {
    setIsSorting(true);
    resetHighlights();
    const a = [...arr];
    for (let i = 0; i < a.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < a.length; j++) {
        await setCompare(minIdx, j);
        if (a[j] < a[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        [a[i], a[minIdx]] = [a[minIdx], a[i]];
        await updateArray([...a]);
      }
      setSortedBoundary(i);
    }
    resetHighlights();
    setIsSorting(false);
  };

  const mergeSort = async () => {
    setIsSorting(true);
    resetHighlights();
    const a = [...arr];

    async function merge(l, m, r) {
      const left = a.slice(l, m + 1);
      const right = a.slice(m + 1, r + 1);
      let i = 0,
        j = 0,
        k = l;
      while (i < left.length && j < right.length) {
        await setCompare(l + i, m + 1 + j);
        if (left[i] <= right[j]) {
          a[k++] = left[i++];
        } else {
          a[k++] = right[j++];
        }
        await updateArray([...a]);
      }
      while (i < left.length) {
        a[k++] = left[i++];
        await updateArray([...a]);
      }
      while (j < right.length) {
        a[k++] = right[j++];
        await updateArray([...a]);
      }
    }

    async function ms(l, r) {
      if (l >= r) return;
      const m = Math.floor((l + r) / 2);
      await ms(l, m);
      await ms(m + 1, r);
      await merge(l, m, r);
    }

    await ms(0, a.length - 1);
    setArr(a);
    resetHighlights();
    setIsSorting(false);
  };

  const quickSort = async () => {
    setIsSorting(true);
    resetHighlights();
    const a = [...arr];

    async function partition(l, r) {
      const pivot = a[r];
      let i = l - 1;
      for (let j = l; j < r; j++) {
        await setCompare(j, r);
        if (a[j] <= pivot) {
          i++;
          [a[i], a[j]] = [a[j], a[i]];
          await updateArray([...a]);
        }
      }
      [a[i + 1], a[r]] = [a[r], a[i + 1]];
      await updateArray([...a]);
      return i + 1;
    }

    async function qs(l, r) {
      if (l >= r) return;
      const p = await partition(l, r);
      await qs(l, p - 1);
      await qs(p + 1, r);
    }

    await qs(0, a.length - 1);
    setArr(a);
    resetHighlights();
    setIsSorting(false);
  };

  // Complexity reference
  const complexities = {
    Bubble: { time: "Worst/Avg O(n^2), Best O(n)", space: "O(1)" },
    Insertion: { time: "Worst/Avg O(n^2), Best O(n)", space: "O(1)" },
    Selection: { time: "O(n^2)", space: "O(1)" },
    Merge: { time: "O(n log n)", space: "O(n)" },
    Quick: { time: "Worst O(n^2), Avg/Best O(n log n)", space: "O(log n)" },
  };

  // Bar color logic
  const barColor = (idx) => {
    if (activeIndices.includes(idx)) return "bg-yellow-400";
    if (sortedBoundary >= 0 && idx <= sortedBoundary) return "bg-green-400";
    return "bg-blue-500";
  };

  // Layout constants (match provided design)
  return (
    <div className="flex items-center justify-start h-screen bg-[linear-gradient(to_bottom,black_0%,_black_50%,_rgb(70,40,120)_90%,#7A6098_100%)] pl-32">
      {/* Modal for user input */}
      {showInputModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[420px]">
            <h3 className="text-lg font-bold mb-3">Enter Array Elements</h3>
            <input
              type="text"
              value={userInputArray}
              onChange={(e) => setUserInputArray(e.target.value)}
              placeholder="e.g. 10, 40, 25, 90"
              className="w-full p-2 border rounded-md mb-4"
            />
            <div className="flex space-x-2">
              <button
                onClick={createFromUserInput}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Create
              </button>
              <button
                onClick={() => setShowInputModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left visualization area */}
      <div className="flex flex-col items-center p-4 bg-gray-800 rounded-md h-[600px] w-[1100px] -ml-0 mr-12">
        <h2 className="text-xl font-bold text-white-700 mb-4">Sorting</h2>
        <div className="flex-1 w-full border-2 border-gray-400 rounded-md overflow-hidden bg-[#fff7f7] flex items-end justify-center px-4">
          {arr.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Create or generate an array to visualize sorting
            </div>
          ) : (
            <div className="w-full h-full flex items-end justify-center space-x-1">
              {arr.map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`transition-all duration-200 ease-in-out ${barColor(
                      i
                    )} w-6 rounded-t-md`}
                    style={{ height: `${v}px` }}
                    title={`${v}`}
                  />
                  <div className="text-[10px] text-gray-600 mt-1">{v}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {arr.length > 0 && (
          <div className="w-full text-center text-gray-600 text-sm mt-2">
            Length: {arr.length}
          </div>
        )}
      </div>

      {/* Right operations panel */}
      <div className="bg-gray-800 rounded-md shadow-lg h-[600px] w-[250px] p-6 flex flex-col space-y-4">
        <h2 className="text-xl font-bold text-white -mb-2 text-center">
          Operations
        </h2>

        {/* Create */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-md font-semibold text-white">Create</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={openUserInput}
              className="bg-[#50338E] hover:bg-[#7C52D6] text-white py-2 px-2 rounded-md transition flex-1 text-sm"
            >
              User Input
            </button>
            <button
              onClick={randomize}
              className="bg-[#50338E] hover:bg-[#7C52D6] text-white py-2 px-2 rounded-md transition flex-1 text-sm"
            >
              Random
            </button>
          </div>
        </div>

        {/* Algorithms */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-md font-semibold text-white">Algorithms</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              disabled={isSorting || arr.length === 0}
              onClick={bubbleSort}
              className="bg-[#50338E] hover:bg-[#7C52D6] disabled:opacity-50 text-white py-2 px-2 rounded-md text-sm"
            >
              Bubble
            </button>
            <button
              disabled={isSorting || arr.length === 0}
              onClick={insertionSort}
              className="bg-[#50338E] hover:bg-[#7C52D6] disabled:opacity-50 text-white py-2 px-2 rounded-md text-sm"
            >
              Insertion
            </button>
            <button
              disabled={isSorting || arr.length === 0}
              onClick={selectionSort}
              className="bg-[#50338E] hover:bg-[#7C52D6] disabled:opacity-50 text-white py-2 px-2 rounded-md text-sm"
            >
              Selection
            </button>
            <button
              disabled={isSorting || arr.length === 0}
              onClick={mergeSort}
              className="bg-[#50338E] hover:bg-[#7C52D6] disabled:opacity-50 text-white py-2 px-2 rounded-md text-sm"
            >
              Merge
            </button>
            <button
              disabled={isSorting || arr.length === 0}
              onClick={quickSort}
              className="bg-[#50338E] hover:bg-[#7C52D6] disabled:opacity-50 text-white py-2 px-2 rounded-md text-sm"
            >
              Quick
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col space-y-2 mt-2">
          <h3 className="text-md font-semibold text-white">Controls</h3>
          <div className="flex items-center space-x-2">
            <button
              disabled={isSorting}
              onClick={() => setArr(arr.slice().reverse())}
              className="bg-[#50338E] hover:bg-[#7C52D6] disabled:opacity-50 text-white py-2 px-4 rounded-md transition text-sm"
            >
              Reverse
            </button>
            <div className="flex items-center space-x-2 flex-1">
              <label className="text-sm text-gray-200">Speed</label>
              <input
                type="range"
                min="0"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              disabled={isSorting}
              onClick={() => setArr([])}
              className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white py-2 px-2 rounded-md text-sm flex-1"
            >
              Clear
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
