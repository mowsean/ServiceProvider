import React from 'react';
export default class AccountList extends React.Component {
    constructor(props) {
        super(props);
    }
    handleButtonClickEdit(account) {

        this.props.OnEdit(account);
    }
    handleButtonClickDelete(account) {

        this.props.OnDelete(account);
    }

    render() {
        return (<table className="table table-stripped">
            <thead>
                <tr>
                    <th>Account</th>
                    <th>User Id</th>
                    <th>Password</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    this.props.Accounts.map((account) =>
                        <tr key={account.AccountName}>
                            <td><a href={account.Website}>{account.AccountName}</a></td>
                            <td>{account.UserId}</td>
                            <td>{account.Password}</td>
                            <td> <button type="button" className="btn btn-primary" onClick={() => this.handleButtonClickEdit(account)}>
                                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </button>
                                &nbsp;&nbsp;
                                        <button type="button" className="btn btn-primary" onClick={() => this.handleButtonClickDelete(account)}>
                                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                </button>
                            </td>
                        </tr>)
                }
            </tbody>
        </table>
        );
    }
}