import { Icon } from '@iconify-icon/react';
import { useStore } from '@nanostores/react';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import type { PostInfo } from 'src/pages/api/posts/[id]';
import { postStatsAtom } from 'src/stores/globalStore';

type Props = {
  slug: string;
};
export const HeartIcon = ({ fill = 'currentColor', ...props }) => {
  return (
    <svg
      fill={'none'}
      height={24}
      viewBox="0 0 24 24"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

function LikeButton({ slug }: Props) {
  const { viewsCount, likesCount } = useStore(postStatsAtom);
  const hasLoadedStats = viewsCount !== null && likesCount !== null;

  const [isLiked, setIsLiked] = useLocalStorage(`liked-${slug}`, false);
  const [loading, setLoading] = useState(false);

  async function handleLike() {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append(isLiked ? 'decrementLikes' : 'incrementLikes', 'true');

      const response = await fetch(`/api/posts/${slug}`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const postInfoData: PostInfo = await response.json();
      postStatsAtom.set(postInfoData);
      setIsLiked(prev => !prev);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching or parsing user data:', error);
      setLoading(false);
    }
  }

  return hasLoadedStats ? (
    <div className="blur-in flex flex-col gap-4 justify-center items-center relative">
      <Button
        isLoading={loading}
        isIconOnly
        aria-label="Like"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background border-[1px] border-accent rounded-full p-6 z-10 opacity-70 text-accent"
        onClick={handleLike}
      >
        <Icon
          icon={`${isLiked ? 'mdi:heart' : 'mdi:heart-outline'}`}
          className={`text-2xl ${isLiked ? 'text-red-500' : 'text-accent'}`}
        />
      </Button>

      <div className="text-[clamp(100px,_10vw,_150px)] opacity-20">
        {likesCount}
      </div>
    </div>
  ) : null;
}

export default LikeButton;
