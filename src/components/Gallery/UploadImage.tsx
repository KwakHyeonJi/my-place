import { Html } from '@react-three/drei';
import imageCompression from 'browser-image-compression';
import { forwardRef } from 'react';

import { replaceImage } from '@store/features/gallerySlice';
import { useAppDispatch } from '@store/store';

interface UploadImageProps {
  imageIndex: number;
}

const UploadImage = forwardRef(
  ({ imageIndex }: UploadImageProps, ref: React.Ref<HTMLInputElement>) => {
    const dispatch = useAppDispatch();

    const compressImage = async (image: File) => {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedBlob = await imageCompression(image, options);
      const compressedImage = new File([compressedBlob], image.name, {
        type: image.type,
      });
      return compressedImage;
    };

    const handleUploadImage = async (e: React.SyntheticEvent) => {
      const target = e.target as HTMLInputElement;
      if (!target.files?.length) return;

      const compressedImage = compressImage(target.files[0]);

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        dispatch(replaceImage({ index: imageIndex, image: result }));
      };
      reader.readAsDataURL(await compressedImage);
      target.value = '';
    };

    return (
      <Html>
        <input
          type="file"
          accept="image/*"
          ref={ref}
          onChange={handleUploadImage}
          style={{ display: 'none' }}
        />
      </Html>
    );
  }
);

export default UploadImage;
