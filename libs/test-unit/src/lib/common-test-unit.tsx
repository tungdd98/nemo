import styles from './common-test-unit.module.css';

/* eslint-disable-next-line */
export interface CommonTestUnitProps {}

export function CommonTestUnit(props: CommonTestUnitProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CommonTestUnit!</h1>
    </div>
  );
}

export default CommonTestUnit;
