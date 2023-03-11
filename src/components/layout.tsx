import { routes } from '@/data';
import { PropsWithChildren } from 'react';
import Footer from './footer';
import Navbar from './navbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar routes={routes} />
      <div className="min-h-screen w-full antialiased bg-gradient-to-tl from-space via-galaxy to-space overflow-y-auto lg:overflow-hidden">
        <div className="px-10 lg:py-20 lg:px-20">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
