import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import SearchIcon from "material-ui/svg-icons/action/search";
import CloseIcon from "material-ui/svg-icons/navigation/close";
import ActionButtonGroup from "../ActionButtonGroup";
import ActionButton from "../ActionButton";
import debounce from "lodash.debounce";
import "./SearchInput.css";
const DEBOUNCE_TIME = 100;

class SearchInput extends PureComponent {
  constructor(props) {
    super(props);

    // allow local state to change immediately, but ensure filter in store is debounced
    this.state = {
      localSearchFilterVal: "",
      isSearchActive: false
    };

    // debounce thunk, to ensure fast typing does not jank the redux store
    this.debouncedSetSearchFilterVal = debounce(
      this.props.setSearchFilterVal,
      DEBOUNCE_TIME
    );
  }

  activateSearch = () => {
    this.setState(prevState => ({ isSearchActive: true }));
  };

  deactivateSearch = () => {
    // clear searchVal in store
    this.props.setSearchFilterVal("");

    // close search state
    this.setState(prevState => ({
      isSearchActive: false,
      localSearchFilterVal: ""
    }));
  };

  searchOnBlurHandler = () => {
    if (this.state.localSearchFilterVal) return;

    this.deactivateSearch();
  };

  onSearchChangeHandler = (_, val) => {
    // set local state immediately
    this.setState(() => ({ localSearchFilterVal: val }));

    // set debounced store state
    this.debouncedSetSearchFilterVal(val);
  };

  searchKeyUpHandler = e => {
    const keyCode = e.keyCode;
    // 27 === escape
    if (keyCode !== 27) return;

    this.deactivateSearch();
  };

  render() {
    const { hintText } = this.props;
    const { isSearchActive, localSearchFilterVal } = this.state;

    return (
      <div
        className="searchInput"
        style={{ display: "flex", alignItems: "center" }}
      >
        {isSearchActive && (
          <TextField
            name="searchFilter"
            style={{ width: "15rem" }}
            hintStyle={{ color: "white", fontSize: "1.1rem" }}
            inputStyle={{
              color: "white",
              fontSize: "1.1rem"
            }}
            underlineFocusStyle={{ borderColor: "white" }}
            value={localSearchFilterVal}
            hintText={hintText}
            onChange={this.onSearchChangeHandler}
            onKeyUp={this.searchKeyUpHandler}
            onBlur={this.searchOnBlurHandler}
            autoFocus={true}
          />
        )}
        <ActionButtonGroup>
          {!isSearchActive && (
            <ActionButton
              title={hintText}
              isDisabled={false}
              onClick={this.activateSearch}
            >
              <SearchIcon />
            </ActionButton>
          )}
          {isSearchActive && (
            <ActionButton
              title={"Close"}
              isDisabled={false}
              onClick={this.deactivateSearch}
            >
              <CloseIcon />
            </ActionButton>
          )}
        </ActionButtonGroup>
      </div>
    );
  }
}

SearchInput.propTypes = {
  setSearchFilterVal: PropTypes.func.isRequired,
  hintText: PropTypes.string.isRequired
};

export default SearchInput;
