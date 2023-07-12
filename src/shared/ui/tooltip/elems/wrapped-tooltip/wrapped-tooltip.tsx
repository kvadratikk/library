import { ErrorTooltip } from '../../types/error';
import { TooltipWrapper } from '../tooltip-wrapper/tooltip-wrapper';

type WrappedTooltipProps = {
  errorType: ErrorTooltip;
};

export const WrappedTooltip = ({ errorType }: WrappedTooltipProps) => {
  const { text, isHighlighted } = errorType;

  return <TooltipWrapper isHighlighted={isHighlighted}>{text}</TooltipWrapper>;
};
