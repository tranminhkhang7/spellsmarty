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
    padding: 0,
    color: 'black',
    fontWeight: 'bold',
  };

  return (
    <div className="mt-6 h-4" style={containerStyles}>
      <div className="bg-primary" style={fillerStyles}>
        <span className="text-sm mt-3" style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
