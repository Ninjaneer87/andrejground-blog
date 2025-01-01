import { useEffect } from 'react';
import type { PostInfo } from 'src/pages/api/posts/[id]';
import { postStatsAtom } from 'src/stores/globalStore';

type Props = {
  slug: string;
};
function FetchPostStats({ slug }: Props) {
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

  return null;
}

export default FetchPostStats;
