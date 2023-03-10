import React, { PropsWithChildren } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { routes } from '@/data';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar routes={routes} />
      <div className="absolute top-0 h-full w-full antialiased bg-gradient-to-tl from-space  via-galaxy to-space" />
      <div className="relative min-h-screen w-full">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
