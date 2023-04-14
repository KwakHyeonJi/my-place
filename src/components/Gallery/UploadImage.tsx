import { Html } from '@react-three/drei';
import { forwardRef } from 'react';

import { changeImage } from '@store/features/gallerySlice';
import { useAppDispatch } from '@store/store';

interface UploadImageProps {
  imageIndex: number;
}

const UploadImage = forwardRef(
  ({ imageIndex }: UploadImageProps, ref: React.Ref<HTMLInputElement>) => {
    const IMG_MAX_SIZE = 1024 * 1024 * 2;

    const dispatch = useAppDispatch();

    const handleUploadImage = (e: React.SyntheticEvent) => {
      const target = e.target as HTMLInputElement;
      if (!target.files?.length) return;

      const file = target.files[0];
      if (file.size > IMG_MAX_SIZE) {
        alert('2MB 이하의 파일만 업로드 가능합니다.');
        return;
      }
      target.value = '';

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        dispatch(changeImage({ index: imageIndex, image: result }));
      };
      reader.readAsDataURL(file);
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
