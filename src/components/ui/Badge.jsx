'use client';

export default function Badge({ priority = 'medium', children }) {
  const classes = {
    high: 'badge-high',
    medium: 'badge-medium',
    low: 'badge-low',
  };
  return <span className={classes[priority] || classes.medium}>{children || priority}</span>;
}
