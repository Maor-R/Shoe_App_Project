const NotFound = () => {
  return (
    <>
      <div style={{ height: '200px' }}></div>
      <div className='text-center'>
        <h1 className='x-large text-brand'>
          <i
            className='fas fa-exclamation-triangle'
            style={{ color: '#53dbb2' }}
          ></i>{' '}
            The page not found
        </h1>
        <p className='large'>The page not found</p>
      </div>
    </>
  );
};

export default NotFound;
