import React from 'react';
import { Badge } from 'react-bootstrap';

import Technology from '../classes/Technology';
import { Link } from 'gatsby';

interface TechnologyBadgeProps {
  technology: Technology;
  pageLink?: boolean | undefined;
  count?: number;
}

const getBootstrapVariant = (technologyType: string) => {
  if (technologyType === 'frontend') {
    return 'success';
  } else if (technologyType === 'backend') {
    return 'warning';
  } else if (technologyType === 'data') {
    return 'danger';
  } else if (technologyType === 'deployment') {
    return 'primary';
  } else if (technologyType === 'cloud') {
    return 'info';
  } else {
    return undefined;
  }
};

const TechnologyBadge = (props: TechnologyBadgeProps) => {
  const { technology, pageLink, count } = props;
  if (technology === undefined || technology === null) {
    return null;
  } else if (
    pageLink === undefined ||
    pageLink === false ||
    technology.type === undefined
  ) {
    return <InnerBadge technology={technology} count={count} />;
  } else {
    return (
      <Link
        style={{ cursor: 'pointer' }}
        to={`/technologies/${technology.type}/${technology.id}`}
      >
        <InnerBadge technology={technology} count={count} />
      </Link>
    );
  }
};

const InnerBadge = props => {
  const { technology, count } = props;
  return (
    <Badge variant={getBootstrapVariant(technology.type)} pill>
      {technology.label} <CountBadge count={count} />
    </Badge>
  );
};

export const CountBadge = props => {
  const { count } = props;
  if (count === undefined) {
    return null;
  } else {
    return <Badge variant='light'>{count}</Badge>;
  }
};

export default TechnologyBadge;
