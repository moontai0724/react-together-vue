import type { Category } from "./category";
import type { FlickrPhoto } from "./flickr-photo";
import type { FlickrPhotoSize } from "./flickr-photo-size";
import type { Photographer } from "./photographer";

export interface Photo {
  /**
   * Auto-incremented serial id for photo in this system
   */
  id: number;
  /**
   * File name
   */
  fileName: string;
  category: Category;
  photographer: Photographer;
  flickrPhoto: FlickrPhoto;
  flickrPhotoSizes: FlickrPhotoSize[];
  reactions: {
    /**
     * number of recommendations
     */
    like: number;
    /**
     * number of not recommendations
     */
    dislike: number;
    comments: (null | string)[];
  };
  reaction: null | {
    /**
     * Whether the user recommends this photo
     */
    recommend: boolean;
    comment: null | string;
  };
}
