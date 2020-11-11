import React from 'react';

function Pagination(props) {
  return (
    <section className="uk-section uk-section-small uk-tile-default uk-text-center">
      <div>
        {props.prevPage != null ? (
          <button
            type="button"
            className="uk-button uk-button-secondary uk-margin-right"
            onClick={() => props.setPage(props.prevPage)}
          >
            Prev
          </button>
        ) : (
          <button
            type="button"
            className="uk-button uk-button-secondary uk-margin-right"
            disabled
          >
            Prev
          </button>
        )}
        <span>
          Page {props.currentPage} of {props.maxPage}
        </span>
        {props.nextPage != null ? (
          <button
            type="button"
            className="uk-button uk-button-secondary uk-margin-left"
            onClick={() => props.setPage(props.nextPage)}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className="uk-button uk-button-secondary uk-margin-left"
            disabled
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
}

export default Pagination;
