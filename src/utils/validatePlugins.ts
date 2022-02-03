import { IPluginsObject } from '../lib';

export const validatePlugins = (plugins: IPluginsObject) : void => {
  if (plugins?.scrollToError !== undefined && typeof plugins.scrollToError !== 'function') {
    throw new Error('Plugin "scrollToError" must be a type of function!');
  }

  if (plugins?.validator !== undefined && typeof plugins.validator !== 'function') {
    throw new Error('Plugin "validate" must be a type of function!');
  }
};
