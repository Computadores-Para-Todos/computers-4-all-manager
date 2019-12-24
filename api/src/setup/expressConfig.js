import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';

/**
 * @param app
 */
export default function(app) {
  app.use(logger('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
}
