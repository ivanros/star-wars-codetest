import { routes } from '@/data';
import { PropsWithChildren } from 'react';
import Footer from './footer';
import Navbar from './navbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar routes={routes} />
      <div className="min-h-screen h-max w-full antialiased bg-gradient-to-tl from-space via-galaxy to-space">
        <div className="py-20 px-20">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
