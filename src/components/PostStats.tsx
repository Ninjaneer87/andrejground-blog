import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import type { PostInfo } from 'src/pages/api/posts/[id]';
import { postStatsAtom } from 'src/stores/globalStore';

type Props = {
  slug: string;
};
function PostStats({ slug }: Props) {
  const { viewsCount, likesCount } = useStore(postStatsAtom);
  const hasLoadedStats = viewsCount !== null && likesCount !== null;

  useEffect(() => {
    async function fetchPostInfo() {
      try {
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const postInfoData: PostInfo = await response.json();
        postStatsAtom.set(postInfoData);
      } catch (error) {
        console.error('Error fetching or parsing user data:', error);
      }
    }

    fetchPostInfo();

    return () => {
      postStatsAtom.set({ viewsCount: null, likesCount: null });
    };
  }, []);

  return hasLoadedStats ? (
    <div className='blur-in'>
      <div className="flex items-center gap-1 text-sm font-thin">
        <Icon icon="mdi:eye-outline" className="opacity-40" />
        {viewsCount} views
      </div>
      <div className="flex items-center gap-1 text-sm font-thin">
        <Icon icon="mdi:heart" className="opacity-40" />
        {likesCount} likes
      </div>
    </div>
  ) : null;
}

export default PostStats;
