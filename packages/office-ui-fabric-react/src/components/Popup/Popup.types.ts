/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Popup } from './Popup';

export interface IPopup {

}

export interface IPopupProps extends React.HTMLAttributes<Popup> {
  /**
   * Optional callback to access the IPopup interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IPopup | null) => void;

  /**
   * Aria role for popup
   */
  role?: string;

  /**
   * Accessible label text for the popup.
   */
  ariaLabel?: string;

  /**
   *  Defines the element id referencing the element containing label text for popup.
   */
  ariaLabelledBy?: string;

  /**
    * Defines the element id referencing the element containing the description for the popup.
    */
  ariaDescribedBy?: string;

  /**
   * A callback function for when the popup is dismissed from the close button or light dismiss. If provided, will
   * handle escape keypresses and call this. The event will be stopped/canceled.
   */
  onDismiss?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => any;

  /**
   *  Optional class name for the root popup div.
   */
  className?: string;

  /**
   * If true, the unmounting of this component will cause focus to be restored to the element that had focus when first mounted.
   * @default true
   */
  shouldRestoreFocus?: boolean;
}