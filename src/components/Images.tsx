import "./images.css";
import { ImagesProps } from "../types";

function Images({
  images,
  handleImageClick,
  selectedImage,
}: ImagesProps): JSX.Element {
  return (
    <section className="images-container">
      {images.map((image) => (
        <div key={image.id}>
          <img
            onClick={() => handleImageClick(image)}
            className={
              selectedImage && selectedImage.id === image.id
                ? "sel-image"
                : "image"
            }
            src={image.url}
            alt={image.filename}
          />
          <div className="image-info">
            <h4 className="filename">
              {image.filename.slice(0, 23) +
                (image.filename.length > 23 ? "..." : "")}
            </h4>
            <h4>{(image.sizeInBytes / 1000000).toFixed(2)} MB</h4>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Images;
