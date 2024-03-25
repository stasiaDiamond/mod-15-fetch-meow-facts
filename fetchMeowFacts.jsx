function Pagination({ items, pageSize, onPageChange }) {
  const pageCount = items ? Math.ceil(items.length / pageSize) : 0;
  if (pageCount === 1) return null;

  const pages = range(1, pageCount);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className="page-item">
            <a className="page-link" href="#" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const range = (start, end) => {
  return Array(end - start + 1)
    .fill().map((_, idx) => start + idx);
};

function paginate(items, pageNumber, pageSize) {
  const start = (pageNumber - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await axios(url);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.data }); // Note the payload structure
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };

    fetchData();
  }, [url]);

  return [state, setUrl];
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

function App() {
  const { Fragment, useState } = React;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'https://meowfacts.herokuapp.com/?count=100',
    []
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  let page = paginate(data, currentPage, pageSize);

  return (
    <Fragment>
      {isLoading ? (
        <div>Loading ...</div>
      ) : isError ? (
        <div>Something went wrong ...</div>
      ) : (
        <ul className="list-group">
          {page.map((fact, index) => (
            <li key={index} className="list-group-item bg-success">{fact}</li>
          ))}
        </ul>
      )}
      <div className="d-flex justify-content-between my-2">
        <button
          type="button"
          className="btn"
          style={{ backgroundColor: '#FF69B4', color: 'white' }} // Inline style for pink color
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn"
          style={{ backgroundColor: '#FF69B4', color: 'white' }} // Inline style for pink color
          onClick={() => handlePageChange(Math.min(data.length / pageSize, currentPage + 1))}
        >
          Next
        </button>
      </div>
      <Pagination
        items={data}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
