import { css } from "lit-element";

/**
 * border-box and no padding or margin
 */
export const defaultStyles = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`;

export const fireworkStyles = css`
  * {
    position: absolute;
    transform: translate(-50%, 50%);
    border-radius: 50%;
  }
  /** Intermediate class so children can be 'absolute' */
  .relative {
    position: relative;
    transform: initial;
    left: 50%;
    top: 50%;
  }
  .relative * {
    left: 0;
    bottom: 0;
  }
`;
