import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { useStore } from '@nanostores/react';
import { postStatsAtom } from 'src/stores/globalStore';

function PostStats() {
  const { viewsCount, likesCount } = useStore(postStatsAtom);
  const hasLoadedStats = viewsCount !== null && likesCount !== null;

  return hasLoadedStats ? (
    <div className="blur-in">
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
