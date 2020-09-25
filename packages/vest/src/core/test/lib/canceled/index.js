import state from '../../../state';
import { KEY_CANCELED } from '../../../state/constants';

/**
 * Adds a VestTest to the canceled state.
 * @param  {VestTest[]} testObjects
 */
export const setCanceled = (...testObjects) => {
  if (!testObjects || !testObjects.length) {
    return;
  }

  state.set(state => ({
    ...state,
    [KEY_CANCELED]: testObjects.reduce((ids, testObjects) => {
      ids[testObjects.id] = true;
      return ids;
    }, state[KEY_CANCELED]),
  }));
};

/**
 * Removes a test from canceled state.
 * @param {VestTest} testObject
 */
export const removeCanceled = testObject => {
  state.set(state => {
    delete state[KEY_CANCELED][testObject.id];
    return state;
  });
};
