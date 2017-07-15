import React, {PropTypes} from 'react';



function Main({children, location}) {
  return (
    <div>
      <Footer location={location} childrens={children} />
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
};

export default Main;
