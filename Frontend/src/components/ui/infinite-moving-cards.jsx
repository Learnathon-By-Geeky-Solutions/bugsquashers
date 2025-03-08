import PropTypes from "prop-types";

export const InfiniteMovingCards = ({ items, className }) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>{item.quote}</p>
          {/* Render other item properties as needed */}
        </div>
      ))}
    </div>
  );
};

InfiniteMovingCards.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      quote: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      title: PropTypes.string,
      rating: PropTypes.number,
    })
  ).isRequired,
  className: PropTypes.string,
};

export default InfiniteMovingCards;