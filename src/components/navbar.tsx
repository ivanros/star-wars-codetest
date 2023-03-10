import React from 'react';
import { MobileNav, Navbar as MTNavbar, Typography } from '@material-tailwind/react';
import Link from 'next/link';

interface NavbarProps {
  brandName?: string;
  routes: Array<any>;
}

export function Navbar(props: NavbarProps) {
  const { brandName, routes } = props;
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path }) => (
        <Typography key={name} as="li" variant="small" color="inherit" className="capitalize">
          <Link
            role="link"
            href={path}
            className="flex items-center gap-1 p-1 font-normal"
            aria-label={name}
          >
            {name}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <MTNavbar color="transparent" className="absolute p-3 z-10">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link href="/">
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">{brandName}</Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
      </div>
      <MobileNav className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900" open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </MobileNav>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: 'Star Wars Wiki',
};

export default Navbar;
