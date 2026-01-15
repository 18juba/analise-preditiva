import type { ChangeEvent } from 'react';
import { useState } from 'react';
import '../styles/ImageUploader.css';

interface Props {
  onImageSelected: (file: File) => void;
}

export function ImageUploader({ onImageSelected }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onImageSelected(file);
    }
  };

  return (
    <div className={`image-uploader ${preview ? 'has-preview' : ''}`}>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        className="file-input"
      />
      
      {preview ? (
        <img 
          src={preview} 
          alt="Preview" 
          className="preview-image"
        />
      ) : (
        <div>
          <span className="upload-placeholder-icon">📷</span>
          <p className="upload-placeholder-text">Clique ou arraste uma imagem aqui</p>
        </div>
      )}
    </div>
  );
}