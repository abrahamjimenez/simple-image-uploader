import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import "./Dropzone.scss"

const Dropzone = () => {
  const onDrop = useCallback(async acceptedFiles => {
    const file = acceptedFiles[0]

    console.log("dzfile", file);

    const formData = new FormData();
    formData.append("file", file)

    console.log(`Params: ${file}`)

    const res = await fetch("/api/upload", { method: "POST", body: formData })
    const data = await res.json()

    console.log("data", data);

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <div>
            <p className="headline">Drag and drop a file or <span
              className="accent-primary">browse files</span></p>
            <p className="accent-secondary">JPG, PNG, or GIF - Max file size 2MB</p>
          </div>
      }
    </div>
  );
};

export default Dropzone;
