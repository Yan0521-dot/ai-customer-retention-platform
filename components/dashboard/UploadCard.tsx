"use client";

import { useState } from "react";
import { Upload, FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function UploadCard() {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    setTimeout(() => {
      window.location.href = "/dashboard/analyze";
    }, 2500);
  }

  return (
    <div className="mt-10">

      <label
        className="cursor-pointer block rounded-3xl border border-slate-800 bg-slate-900 p-16 hover:border-blue-500 transition"
      >

        <input
          type="file"
          accept=".csv"
          hidden
          onChange={handleUpload}
        />

        {!loading && (
          <div className="text-center">

            <Upload
              size={70}
              className="mx-auto text-blue-500"
            />

            <h2 className="text-3xl font-bold mt-6">
              Upload Customer CSV
            </h2>

            <p className="text-slate-400 mt-3">
              Click anywhere to upload your customer dataset
            </p>

          </div>
        )}

        {loading && (

          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            className="text-center"
          >

            <Sparkles
              className="mx-auto text-cyan-400 animate-pulse"
              size={70}
            />

            <h2 className="text-3xl font-bold mt-6">
              AI is analysing your customers...
            </h2>

            <p className="text-slate-400 mt-4">
              {fileName}
            </p>

            <div className="mt-10 h-2 rounded-full bg-slate-800 overflow-hidden">

              <motion.div
                initial={{width:0}}
                animate={{width:"100%"}}
                transition={{duration:2}}
                className="h-full bg-blue-500"
              />

            </div>

          </motion.div>

        )}

      </label>

    </div>
  );
}
