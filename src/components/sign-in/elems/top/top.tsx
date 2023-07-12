import { Fragment } from 'react';

type TopProps = {
  step: number;
};

export const Top = ({ step }: TopProps) => (
  <Fragment>
    <h4>Регистрация</h4>
    <span>{step} шаг из 3</span>
  </Fragment>
);
