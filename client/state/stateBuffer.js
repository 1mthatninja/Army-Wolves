export const stateBuffer = [];

export function pushState(state) {

  stateBuffer.push(state);

  if (stateBuffer.length > 10) {
    stateBuffer.shift();
  }
}