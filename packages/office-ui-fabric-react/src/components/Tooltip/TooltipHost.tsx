/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  BaseComponent,
  css,
  divProperties,
  getNativeProps,
  getId,
  assign,
  hasOverflow,
  createRef
} from '../../Utilities';
import { ITooltipHostProps, TooltipOverflowMode } from './TooltipHost.types';
import { Tooltip } from './Tooltip';
import { TooltipDelay } from './Tooltip.types';

import * as stylesImport from './TooltipHost.scss';
const styles: any = stylesImport;

export interface ITooltipHostState {
  isTooltipVisible: boolean;
}

export class TooltipHost extends BaseComponent<ITooltipHostProps, ITooltipHostState> {
  public static defaultProps = {
    delay: TooltipDelay.medium
  };

  // The wrapping div that gets the hover events
  private _tooltipHost = createRef<HTMLDivElement>();

  // Constructor
  constructor(props: ITooltipHostProps) {
    super(props);

    this.state = {
      isTooltipVisible: false
    };
  }

  // Render
  public render() {
    const {
      calloutProps,
      children,
      content,
      delay,
      directionalHint,
      directionalHintForRTL,
      hostClassName,
      id,
      overflowMode,
      setAriaDescribedBy = true,
      tooltipProps
    } = this.props;
    const { isTooltipVisible } = this.state;
    const tooltipId = id || getId('tooltip');
    const isContentPresent = !!(content || (tooltipProps && tooltipProps.onRenderContent && tooltipProps.onRenderContent()));
    const showTooltip = isTooltipVisible && isContentPresent;

    return (
      <div
        className={ css('ms-TooltipHost',
          styles.host,
          hostClassName,
          overflowMode !== undefined && styles.hostOverflow
        ) }
        ref={ this._tooltipHost }
        { ...{ onFocusCapture: this._onTooltipMouseEnter } }
        { ...{ onBlurCapture: this._hideTooltip } }
        onMouseEnter={ this._onTooltipMouseEnter }
        onMouseLeave={ this._hideTooltip }
        aria-describedby={ setAriaDescribedBy && isTooltipVisible && content ? tooltipId : undefined }
      >
        { children }
        { showTooltip && (
          <Tooltip
            id={ tooltipId }
            delay={ delay }
            content={ content }
            targetElement={ this._getTargetElement() }
            directionalHint={ directionalHint }
            directionalHintForRTL={ directionalHintForRTL }
            calloutProps={ assign(calloutProps, { onDismiss: this._hideTooltip }) }
            { ...getNativeProps(this.props, divProperties) }
            { ...tooltipProps }
          />
        ) }
      </div>
    );
  }

  private _getTargetElement(): HTMLElement | undefined {
    if (!this._tooltipHost.value) {
      return undefined;
    }

    const { overflowMode } = this.props;

    // Select target element based on overflow mode. For parent mode, you want to position the tooltip relative
    // to the parent element, otherwise it might look off.
    if (overflowMode !== undefined) {
      switch (overflowMode) {
        case TooltipOverflowMode.Parent:
          return this._tooltipHost.value.parentElement!;

        case TooltipOverflowMode.Self:
          return this._tooltipHost.value;
      }
    }

    return this._tooltipHost.value;
  }

  // Show Tooltip
  private _onTooltipMouseEnter = (ev: any): void => {
    const { overflowMode } = this.props;

    if (overflowMode !== undefined) {
      const overflowElement = this._getTargetElement();
      if (overflowElement && !hasOverflow(overflowElement)) {
        return;
      }
    }

    this._toggleTooltip(true);
  }

  private _hideTooltip = (): void => {
    this._toggleTooltip(false);
  }

  private _toggleTooltip(isTooltipVisible: boolean) {
    this.setState(
      { isTooltipVisible },
      () => this.props.onTooltipToggle &&
        this.props.onTooltipToggle(this.state.isTooltipVisible));
  }
}
