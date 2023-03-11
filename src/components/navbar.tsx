import { Navbar as MTNavbar, Typography } from '@material-tailwind/react';
import Link from 'next/link';

interface NavbarProps {
  brandName?: string;
  routes: Array<any>;
}

export function Navbar(props: NavbarProps) {
  const { brandName, routes } = props;

  return (
    <MTNavbar
      color="transparent"
      className="fixed min-w-full py-3 rounded-none bg-galaxy lg:absolute lg:px-20 lg:bg-transparent z-10"
    >
      <div className="container flex items-center justify-between text-white">
        <Link href="/">
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">{brandName}</Typography>
        </Link>
        <ul className="flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
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
      </div>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: 'Star Wars Wiki',
};

export default Navbar;
