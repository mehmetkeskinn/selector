import { useState, useEffect } from "react";
import "./index.css";
import Images from "./components/Images";
import Tabs from "./components/Tabs";
import SelectedImage from "./components/SelectedImage";
import { Image } from "./types";
import MediaQuery from "react-responsive";

function App(): JSX.Element {
  const [images, setImages] = useState<Image[]>([]);
  const [favorites, setFavorites] = useState<Image[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("recently-added");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    fetch("https://agencyanalytics-api.vercel.app/images.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) =>
        setImages(
          [...data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        )
      )
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    setSelectedImage(null);
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  const handleFavoriteClick = (image: Image) => {
    if (favorites.includes(image)) {
      setFavorites(favorites.filter((i) => i.id !== image.id));
      selectedTab !== "recently-added" && setSelectedImage(null);
    } else {
      setFavorites([...favorites, image]);
    }
  };

  const handleDeleteClick = (image: Image) => {
    setImages(images.filter((i) => i.id !== image.id));
    setFavorites(favorites.filter((i) => i.id !== image.id));
    setSelectedImage(null);
  };

  return (
    <>
      <MediaQuery minWidth={1024}>
        <div className="app-container">
          <div className="app-left">
            <Tabs selectedTab={selectedTab} handleTabClick={handleTabClick} />
            <Images
              images={selectedTab === "recently-added" ? images : favorites}
              handleImageClick={handleImageClick}
              selectedImage={selectedImage}
            />
          </div>
          <div className="app-right">
            {selectedImage && (
              <SelectedImage
                selectedImage={selectedImage}
                favorites={favorites}
                handleFavoriteClick={handleFavoriteClick}
                handleDeleteClick={handleDeleteClick}
              />
            )}
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={1024}>
        <Tabs selectedTab={selectedTab} handleTabClick={handleTabClick} />
        {(selectedTab === "recently-added" ? images : favorites).map(
          (image) => (
            <SelectedImage
              selectedImage={image}
              favorites={favorites}
              handleFavoriteClick={handleFavoriteClick}
              handleDeleteClick={handleDeleteClick}
            />
          )
        )}
      </MediaQuery>
    </>
  );
}

export default App;
