'use client'


import React from 'react';
import { NextPageContext } from 'next';




interface ErrorProps {
  statusCode: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
    const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
    return { statusCode };
};

export const runtime = process.env.NEXT_RUNTIME || 'edge';


export default Error;