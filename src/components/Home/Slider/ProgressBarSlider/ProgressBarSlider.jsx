const ProgressBarSlider = (props) => {
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
    padding: 10,
    color: 'black',
    fontWeight: 'bold',
  };

  return (
    <div className="mt-6 h-4" style={containerStyles}>
      <div className="bg-primary" style={fillerStyles}>
        <span className="relative top-4 text-black" style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBarSlider;
