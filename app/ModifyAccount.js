import React from 'react';

export default class ModifyAccount extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            AccountName: props.Account.AccountName,
            Website: props.Account.Website,
            UserId: props.Account.UserId,
            Password: props.Account.Password
        };
    }
    handleWebsiteChange(e) {
        this.setState({
            Website: e.target.value
        });
    }
    handleUserIdChange(e) {
        this.setState({
            UserId: e.target.value
        });
    }
    handlePasswordChange(e) {
        this.setState({
            Password: e.target.value
        });
    }

    handleSubmit() {

        var account = {
            AccountName: this.state.AccountName,
            Website: this.state.Website,
            UserId: this.state.UserId,
            Password: this.state.Password
        };

        this.props.OnSubmit(account);
    }

 
    

    isUserEntryValid() {
        return true;
    }

    render() {
        return (<form>
            <div className="form-group">
                <label htmlFor="accountName">Account Name</label>
                <input type="text" className="form-control" id="accountName" placeholder="Account Name"
                    disabled="true" onChange={this.handleAccountNameChange.bind(this)} />
            </div>
            <div className="form-group">
                <label htmlFor="website">Website</label>
                <input type="text" className="form-control" id="website" placeholder="Website"
                    onChange={this.handleWebsiteChange.bind(this)} />
            </div>
            <div className="form-group">
                <label htmlFor="userid">User Id</label>
                <input type="text" className="form-control" id="userid" placeholder="User Name"
                    onChange={this.handleUserIdChange.bind(this)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="text" className="form-control" id="password" placeholder="Password Name"
                    onChange={this.handlePasswordChange.bind(this)} />
            </div>
            <button type="button" className="btn btn-default" onClick={() => this.handleSubmit()}>Submit</button>
        </form>);
    }
}