/**
 * @typedef {import('express').Express} Express
 */
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';

/**
 * Configurações gerais do app
 * @exports
 * @param {Express} app Express
 * @returns {void}
 */
export default function appConfig(app) {
  app.use(logger('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
}
