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
    <div className="mt-3 h-2" style={containerStyles}>
      <div className="bg-primary" style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBarSlider;
