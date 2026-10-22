'use client';

import classes from "./image-picker.module.css";
import { useRef, useState } from "react";
import Image from "next/image";

export default function ImagePicker({ label, name }) {

    const [pickedImage, setPickedImage] = useState();
    const imagePickRef = useRef();

    function handlePickImage() {
       imagePickRef.current.click();
    }

    function handleImagePicked(event) {
        const file = event.target.files[0];
        if (!file) {
            setPickedImage(null);
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = function () {
            setPickedImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }


    


  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage && (<Image src={pickedImage} alt="Picked" fill />)}
          {!pickedImage && <p>No image picked yet.</p>}
        </div>
        <input className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg , image/jpg"
          ref={imagePickRef}
          onChange={handleImagePicked}
          required
        />
        <button className={classes.button} type="button" onClick={handlePickImage}>
          Pick Image
        </button>
      </div>
    </div>
  );
}
