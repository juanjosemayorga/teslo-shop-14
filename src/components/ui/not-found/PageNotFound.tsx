import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { titleFont } from '@/config/fonts';


export const PageNotFound = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle'>
      <div className='text-center px-5 mx-5'>
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className='font-semibold text-xl'>Whoops! Looks like you got lost.</p>
        <p className='font-light'>
            <span>Let&apos;s get you back to </span>
          <Link href='/' className='font-normal hover:underline transition-all'>
            home
          </Link>
        </p>
      </div>

      <div className='px-5 mx-5'>
        <Image
          src='/imgs/starman_750x750.png'
          alt='Starman'
          className='p-5 sm:p-0'
          width={550}
          height={550}
        />
      </div>
    </div>
  );
}
