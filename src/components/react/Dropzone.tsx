import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import "./Dropzone.scss"

const Dropzone = () => {
    const onDrop = useCallback(async acceptedFiles => {
        console.log("acceptedFiles", acceptedFiles)

        const res = await fetch("/api/upload", { method: "POST"})
        const data = await res.json()

        console.log("data", data);

    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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
