import { CircularProgress } from '@mui/material';
import * as React from 'react';
import './Loader.css'
export interface ILoaderProps {
}

export default function Loader (props: ILoaderProps) {
  return (
    < div className="loader"><CircularProgress thickness={4} size={80} color="primary"/></div>
  );
}
