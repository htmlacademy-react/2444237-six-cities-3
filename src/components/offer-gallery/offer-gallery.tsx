import { MAX_GALLERY_IMAGES_COUNT } from "./const"

type OfferGalleryProps = {
  images: string[]
}

const OfferGallery = ({ images }: OfferGalleryProps) => {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.slice(0, MAX_GALLERY_IMAGES_COUNT).map((image) => (
          <div className="offer__image-wrapper" key={image}>
            <img className="offer__image" src={image} alt="Studio" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OfferGallery
