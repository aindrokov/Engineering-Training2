import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

function mapStateToProps(state) {
  return {
    loading: state.dataLoaded.loading,
  };
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.loading) {
      return;
    }
    return (
      <ModalContainer>
        <div className="popup-container">
          <div className="spinner-container">
            <i className="bi bi-arrow-clockwise"></i>
          </div>
          <span className="loadingtext">Loading...</span>
        </div>
      </ModalContainer>
    );
  }
}

export default connect(mapStateToProps)(Modal);
