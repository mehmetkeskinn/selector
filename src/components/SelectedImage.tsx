import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SelectedImageProps } from "../types";
import "./selectedImage.css";

function SelectedImage({
  selectedImage,
  favorites,
  handleFavoriteClick,
  handleDeleteClick,
}: SelectedImageProps): JSX.Element {
  return (
    <section>
      <div className="selected-images-container">
        <img
          className="selected-image"
          src={selectedImage.url}
          alt={selectedImage.title}
        />
        <div className="image-info-selected">
          <div>
            <h4 className="filename">
              {selectedImage.filename.slice(0, 15) +
                (selectedImage.filename.length > 15 ? "..." : "")}
            </h4>
            <>
              {favorites.includes(selectedImage) ? (
                <AiFillHeart
                  className="heart-icon"
                  onClick={() => handleFavoriteClick(selectedImage)}
                />
              ) : (
                <AiOutlineHeart
                  className="heart-icon"
                  onClick={() => handleFavoriteClick(selectedImage)}
                />
              )}
            </>
          </div>
          <h5>{(selectedImage.sizeInBytes / 1000000).toFixed(2)} MB</h5>
          <h2>information</h2>
          <div className="file-details">
            <div className="label">Uploaded by</div>
            <div className="value">{selectedImage.uploadedBy}</div>
            <div className="label">Created</div>
            <div className="value">{selectedImage.createdAt}</div>
            <div className="label">Last modified</div>
            <div className="value">{selectedImage.updatedAt}</div>
            <div className="label">Dimensions</div>
            <div className="value">
              {selectedImage.dimensions.height} x
              {selectedImage.dimensions.width}
            </div>
            <div className="label">Resolution</div>
            <div className="value">
              {selectedImage.resolution.height} x
              {selectedImage.resolution.width}
            </div>
          </div>
          <h2>Description:</h2> {selectedImage.description}
          <div className="image-actions">
            <button
              className="btn-delete"
              onClick={() => handleDeleteClick(selectedImage)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SelectedImage;
