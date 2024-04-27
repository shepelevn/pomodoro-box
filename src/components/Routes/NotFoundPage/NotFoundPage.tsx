import React from 'react';
import styles from './notfoundpage.module.scss';

export function NotFoundPage() {
  return (
    <article className="container">
      <h1>
        <span className={styles.titleLine}>Ошибка 404</span>
        <span className={styles.titleLine}>Страница не найдена</span>
      </h1>
    </article>
  );
}
