import classes from './MainNav.module.css';
import { useActiveBoxPosition } from '@andrejground/hooks';

type Props = {
  links: {
    href: string;
    text: string;
    isActive: boolean;
  }[];
};
function MainNav({ links }: Props) {
  const activeLinkHref = links
    .filter(link => link.isActive)
    .map(link => link.href)[0];
  const { listItemsRef, activeBoxPosition } = useActiveBoxPosition({
    activeItem: activeLinkHref,
    recalculate: [activeLinkHref],
  });

  return (
    <ul
      className={`flex items-center ${classes.list} z-0`}
      style={!!activeLinkHref ? activeBoxPosition : {}}
    >
      {links.map(link => (
        <li
          key={link.href}
          data-key={link.href}
          ref={node => {
            if (!node) return;

            listItemsRef.current[link.href] = node;
          }}
        >
          <a
            href={link.href}
            className={`block p-2 md:px-4 md:p-y2 ${link.isActive ? 'text-accent' : 'text-foreground'}`}
          >
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default MainNav;
