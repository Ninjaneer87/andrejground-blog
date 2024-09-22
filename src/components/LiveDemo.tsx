import { useEffect } from 'react';
import sdk from '@stackblitz/sdk';

type Props = {
  projectId: string;
};
function LiveDemo({ projectId }: Props) {
  useEffect(() => {
    sdk.embedProjectId('embed', projectId, {
      hideDevTools: true,
      hideExplorer: true,
      height: 400,
      view: 'preview',
      theme: 'dark',
    });
  }, [projectId]);

  return (
    <section className="heading">
      <h2 id="live-demo">Live demo</h2>
      <div id="embed"></div>
    </section>
  );
}

export default LiveDemo;
