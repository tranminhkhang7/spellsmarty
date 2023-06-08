const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    backgroundColor: '#e0e0de',
    borderRadius: 50,
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    // backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <div className="mt-12 h-9" style={containerStyles}>
      <div className="bg-primary" style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
