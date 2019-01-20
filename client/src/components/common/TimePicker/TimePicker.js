import React from "react";
import PropTypes from "prop-types";
import VMasker from "vanilla-masker";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import cssVars from "../../../styles/cssVars";
import "./TimePicker.css";

class TimePicker extends React.Component {
  textField = {
    errMsg: `Field must contain a valid time in the 12-hour clock (##:##) format.`,
    mask: { pattern: "99:99" },
    onChange: evt => {
      const { target } = evt;

      this.setErrorMsg(target.name);
      this.setMaskTime(target.name, target.value);
    },
    onBlur: evt => {
      const { target } = evt;

      if (!target.checkValidity()) {
        this.setErrorMsg(target.name, this.textField.errMsg);
      }
    }
  };

  selectField = {
    times: [
      "12:00",
      "12:30",
      "01:00",
      "01:30",
      "02:00",
      "02:30",
      "03:00",
      "03:30",
      "04:00",
      "04:30",
      "05:00",
      "05:30",
      "06:00",
      "06:30",
      "07:00",
      "07:30",
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30"
    ],
    onChange: (name, evt, key, payload) => {
      this.setErrorMsg(name);
      this.setMaskTime(name, payload);
    }
  };

  setMaskTime = (name, time) => {
    this.setState(
      () => ({
        [name]: TimePicker.getMaskTime(time)
      }),
      this.updateParent
    );
  };

  static getMaskTime = (time = "") => ({
    time: VMasker.toPattern(time, "99:99"),
    meridiem: time.split(" ")[1] || ""
  });

  setErrorMsg = (name, msg) => {
    this.setState(prevState => ({
      errorTxt: {
        ...prevState.errorTxt,
        [name]: msg
      }
    }));
  };

  static getWholeTime = to => `${to.time} ${to.meridiem}`.trim();

  updateParent = () => {
    const { start, end } = this.state;
    const startTime = TimePicker.getWholeTime(start);
    const endTime = TimePicker.getWholeTime(end);

    this.props.onChange({ startTime, endTime });
  };

  state = {
    errorTxt: {},
    start: TimePicker.getMaskTime(this.props.startTime),
    end: TimePicker.getMaskTime(this.props.endTime)
  };

  static getDerivedStateFromProps({ startTime, endTime }, prevState) {
    let newState = {};

    if (startTime !== TimePicker.getWholeTime(prevState.start)) {
      newState.start = TimePicker.getMaskTime(startTime);
    }

    if (endTime !== TimePicker.getWholeTime(prevState.end)) {
      newState.end = TimePicker.getMaskTime(endTime);
    }

    return Object.keys(newState).length ? newState : null;
  }

  render() {
    const { errorTxt } = this.state;

    return (
      <form className="timePicker">
        {["start", "end"].map(key => (
          <div key={key} className="timePicker__field">
            <TextField
              hintText="HH:MM"
              fullWidth={true}
              floatingLabelFixed={true}
              maxLength="5"
              pattern="((0\d)|(1[0-2])):\d{2}"
              name={key}
              title={errorTxt[key]}
              errorText={errorTxt[key]}
              value={this.state[key].time}
              floatingLabelText={`Shift ${this.props.shiftNumber} : ${
                key === "start" ? "Start" : "End"
              }`}
              className="timePicker__fieldInput"
              style={{ color: "currentColor" }}
              floatingLabelStyle={{ color: "var(--color-label)" }}
              inputStyle={{ color: "currentColor", fontSize: "1.5em" }}
              errorStyle={{
                background: "#fff",
                bottom: 0,
                position: "absolute",
                transform: "translateY(100%)",
                zIndex: 2
              }}
              underlineStyle={{ borderBottomColor: "currentColor" }}
              underlineFocusStyle={{
                borderBottomColor: cssVars.colors.cerulean
              }}
              onChange={this.textField.onChange}
              onBlur={this.textField.onBlur}
            />
            <span className="timePicker__fieldMeridiem">
              {this.state[key].meridiem}
            </span>
            <SelectField
              fullWidth={true}
              className="timePicker__fieldSelect"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%"
              }}
              iconStyle={{ color: "red" }}
              onChange={(...args) => this.selectField.onChange(key, ...args)}
            >
              <MenuItem key="" value="" primaryText="[remove]" />
              {this.selectField.times.map(time => (
                <MenuItem
                  key={`${time}a`}
                  value={`${time} AM`}
                  primaryText={`${time} AM`}
                />
              ))}
              {this.selectField.times.map(time => (
                <MenuItem
                  key={`${time}p`}
                  value={`${time} PM`}
                  primaryText={`${time} PM`}
                />
              ))}
            </SelectField>
          </div>
        ))}
      </form>
    );
  }
}

TimePicker.propTypes = {
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  shiftNumber: PropTypes.string.isRequired
};

export default TimePicker;
