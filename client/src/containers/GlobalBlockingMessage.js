import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MaterialDialog from "material-ui/Dialog";
import LoadingIcon from "../components/common/LoadingIcon";
import { getGlobalBlockingMessage } from "../reducers/rootReducer";

class GlobalBlockingMessage extends PureComponent {
  render() {
    const { message } = this.props;

    if (!message) return null;

    // a split message would be formatted 'first part : second part'
    // message does not have to be split with a ':', it will display normally otherwise
    const messageParts = message.split(":").map(s => s.trim());

    return (
      <MaterialDialog
        title={
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                position: "relative",
                height: "10rem",
                width: "10rem",
                margin: "2rem auto"
              }}
            >
              <LoadingIcon height="10rem" />
            </div>
            {messageParts.map(messagePart => (
              <h1 key={messagePart}>{messagePart}</h1>
            ))}
          </div>
        }
        modal={true}
        open={true}
      />
    );
  }
}

const mapStateToProps = state => ({
  message: getGlobalBlockingMessage(state.root)
});

GlobalBlockingMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(GlobalBlockingMessage);
