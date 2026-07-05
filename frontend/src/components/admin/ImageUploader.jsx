import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HiOutlineCloudArrowUp,
  HiOutlinePhoto,
  HiOutlineXMark,
  HiOutlineCheckCircle,
} from 'react-icons/hi2';
import { prototypeService } from '../../services/prototypeService';
import { getImageUrl } from '../../utils/helpers';

const ImageUploader = ({
  onUpload,
  multiple = false,
  accept = 'image/*',
  currentImages = [],
  uploadType = 'thumbnail',
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previews, setPreviews] = useState([]);
  const inputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const processFiles = useCallback(
    async (files) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      const newPreviews = fileArray.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        name: file.name,
        uploading: true,
        uploaded: false,
      }));

      setPreviews((prev) => [...prev, ...newPreviews]);
      setUploading(true);

      const uploadedUrls = [];
      const totalFiles = fileArray.length;

      for (let i = 0; i < fileArray.length; i++) {
        try {
          const result = await prototypeService.uploadImage(fileArray[i], uploadType);
          const uploadedUrl = result.url || result.path || result.filename;
          uploadedUrls.push(uploadedUrl);

          setPreviews((prev) =>
            prev.map((p) =>
              p.name === fileArray[i].name
                ? { ...p, uploading: false, uploaded: true, serverUrl: uploadedUrl }
                : p
            )
          );

          setProgress(Math.round(((i + 1) / totalFiles) * 100));
        } catch (error) {
          console.error(`Failed to upload ${fileArray[i].name}:`, error);
          setPreviews((prev) =>
            prev.map((p) =>
              p.name === fileArray[i].name
                ? { ...p, uploading: false, uploaded: false, error: true }
                : p
            )
          );
        }
      }

      setUploading(false);
      setProgress(0);

      if (uploadedUrls.length > 0) {
        onUpload(multiple ? uploadedUrls : uploadedUrls[0]);
      }
    },
    [multiple, onUpload, uploadType]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleChange = useCallback(
    (e) => {
      processFiles(e.target.files);
      e.target.value = '';
    },
    [processFiles]
  );

  const removePreview = useCallback(
    (index) => {
      setPreviews((prev) => {
        const removed = prev[index];
        if (removed?.url) URL.revokeObjectURL(removed.url);
        return prev.filter((_, i) => i !== index);
      });
    },
    []
  );

  const removeCurrentImage = useCallback(
    (index) => {
      const updated = currentImages.filter((_, i) => i !== index);
      onUpload(multiple ? updated : updated[0] || null);
    },
    [currentImages, multiple, onUpload]
  );

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-2xl p-8
          flex flex-col items-center justify-center gap-3
          cursor-pointer transition-all duration-300
          ${
            dragOver
              ? 'border-accent-400 bg-accent-500/10 scale-[1.02]'
              : 'border-white/15 hover:border-white/30 hover:bg-white/5'
          }
        `}
      >
        <motion.div
          animate={dragOver ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiOutlineCloudArrowUp
            className={`w-10 h-10 ${dragOver ? 'text-accent-400' : 'text-white/30'}`}
          />
        </motion.div>

        <div className="text-center">
          <p className="text-sm font-medium text-white/70">
            {dragOver ? 'Drop files here' : 'Drag & drop or click to upload'}
          </p>
          <p className="text-xs text-white/40 mt-1">
            {multiple ? 'PNG, JPG, WebP (multiple)' : 'PNG, JPG, WebP (single)'}
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Current Images */}
      {currentImages.length > 0 && (
        <div>
          <p className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wider">Current</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {currentImages.map((img, index) => (
              <div key={index} className="relative group rounded-xl overflow-hidden aspect-video bg-surface-600">
                <img
                  src={getImageUrl(img)}
                  alt={`Current ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeCurrentImage(index)}
                    className="p-2 bg-red-500/80 rounded-lg text-white hover:bg-red-500 transition-colors"
                  >
                    <HiOutlineXMark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Upload Previews */}
      <AnimatePresence>
        {previews.length > 0 && (
          <div>
            <p className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wider">New Uploads</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {previews.map((preview, index) => (
                <motion.div
                  key={preview.name + index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group rounded-xl overflow-hidden aspect-video bg-surface-600"
                >
                  <img
                    src={preview.url}
                    alt={preview.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Status Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {preview.uploading && (
                      <div className="bg-black/60 rounded-lg p-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-accent-400 rounded-full animate-spin" />
                      </div>
                    )}
                    {preview.uploaded && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-green-500/80 rounded-full p-1"
                      >
                        <HiOutlineCheckCircle className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                    {preview.error && (
                      <div className="bg-red-500/80 rounded-lg px-2 py-1 text-xs text-white">
                        Failed
                      </div>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removePreview(index)}
                    className="absolute top-1.5 right-1.5 p-1 bg-black/60 rounded-lg text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <HiOutlineXMark className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUploader;
