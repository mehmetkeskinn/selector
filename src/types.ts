export interface Image {
  id: string;
  url: string;
  title: string;
  filename: string;
  sizeInBytes: number;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  dimensions: {
    height: number;
    width: number;
  };
  resolution: {
    height: number;
    width: number;
  };
  description: string;
}

export interface ImagesProps {
  images: Image[];
  handleImageClick: (image: Image) => void;
  selectedImage: Image | null;
}

export interface SelectedImageProps {
  selectedImage: Image;
  favorites: Image[];
  handleFavoriteClick: (image: Image) => void;
  handleDeleteClick: (image: Image) => void;
}

export interface TabsProps {
  selectedTab: string;
  handleTabClick: (tabName: string) => void;
}
