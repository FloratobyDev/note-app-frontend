import React, { useState } from 'react';

function ImageUploader() {
    const [imageSrc, setImageSrc] = useState(null);
    const [setInputRef] = useState(null);

    function handleFileSelect(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            setImageSrc(e.target.result);
        }

        reader.readAsDataURL(file);
    }

    return (
        <div>
            <input id="file" ref={setInputRef} type="file" onChange={handleFileSelect} style={{ display: 'none' }} />
            <label className=' border border-white p-2' htmlFor="file">Select Image</label>
            <img className=' w-44 h-44' src={imageSrc} alt="Selected" />
        </div>
    );
}

export default ImageUploader;