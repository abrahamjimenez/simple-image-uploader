import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import "./Dropzone.scss"

const Dropzone = () => {
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: any[]) => {
    const file = acceptedFiles[0]

    const formData = new FormData();
    formData.append("file", file)

    try {
      setLoading(true)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()

      console.log(data)
      setLoading(false)
    } catch (e) {
      console.error("Error", e)
    }

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


  return (
    <>
      {loading ? (<p>Uploading...</p>) : (

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
        </div >
      )}
    </>
  );
};

export default Dropzone;
