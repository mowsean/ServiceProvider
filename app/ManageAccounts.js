import React from 'react'
import ReactDOM from 'react-dom'
import AccountList from './AccountList.js';
import NewAccount from './NewAccount.js';
import FilterAndAdd from './Filter.js';
import ModifyAccount from './ModifyAccount.js';
export default class ManageAccounts extends React.Component {
 
    showNewAccountScreen() {

        this.setState({
            ShowNewAccountUI: true,
            ShowAccountList: false,
            ShowFilterUI: false
        })
    }

   showModifyAccountScreen(accountToModify) {

        this.setState({
            ShowModifyAccountUI: true,
            ShowAccountList: false,
            ShowFilterUI: false,
            AccountToBeModified: accountToModify
        })
    }
 
    filterAccountList(filter) {

        var newAccountList = JSON.parse(localStorage.getItem("AccountList")).filter(function (account) {
            return account.AccountName.includes(filter);
        });

        this.setState({
            AccountList: newAccountList,
        });
    }

    constructor(props) {
        super(props);
        //Create a Local Storage Item to hold list of Accounts, if it does not already exist              
        if (localStorage.getItem('AccountList') === null) {
            //initialize the Local Storage with an empty array
            localStorage.setItem('AccountList', JSON.stringify([]));
        }

        //Define the Initial State of the Application
        this.state = {
            ShowNewAccountUI: false,
            ShowModifyAccountUI: false,
            ShowAccountList: true,
            ShowFilterUI: true,
            AccountList: JSON.parse(localStorage.getItem('AccountList'))

        }


    }

    addNewAccount(account) {
        var accountList = JSON.parse(localStorage.getItem('AccountList'));
        accountList.push(account);
        localStorage.setItem("AccountList", JSON.stringify(accountList));

        this.setState({
            ShowNewAccountUI: false,
            ShowModifyAccountUI: false,
            ShowAccountList: true,
            ShowFilterUI: true,
            AccountList: JSON.parse(localStorage.getItem('AccountList'))
        });

    }

    modifyAccount(accountToModify) {

        var accountList = JSON.parse(localStorage.getItem('AccountList'));
        var index = accountList.findIndex(function (account) {
            return accountToModify.AccountName === account.AccountName;
        });
        if (index != -1) {
            accountList[index].AccountName = accountToModify.AccountName;
            accountList[index].Website = accountToModify.Website;
            accountList[index].UserId = accountToModify.UserId;
            accountList[index].Password = accountToModify.Password;
        }
        localStorage.setItem('AccountList', JSON.stringify(accountList));
        this.setState({
            ShowNewAccountUI: false,
            ShowModifyAccountUI: false,
            ShowAccountList: true,
            ShowFilterUI: true,
            AccountList: JSON.parse(localStorage.getItem('AccountList'))
        });
    }

    removeAccount(accountToRemove) {

        var result = confirm("Are you sure you want to remove the account");
        if (result == false)
            return;
        var accountList = JSON.parse(localStorage.getItem("AccountList"))
        var newAccountList = accountList.filter(function (account) {
            return account.AccountName != accountToRemove.AccountName
        });
        localStorage.setItem("AccountList", JSON.stringify(newAccountList));
        this.setState({
            AccountList: JSON.parse(localStorage.getItem('AccountList'))
        });
    }


     render() {
         return (
             <div>
                 {this.state.ShowFilterUI && <FilterAndAdd OnAdd={this.showNewAccountScreen.bind(this)} OnFilter={this.filterAccountList.bind(this)} />}
                 {this.state.ShowAccountList && <AccountList Accounts={this.state.AccountList} OnEdit={this.showModifyAccountScreen.bind(this)} OnDelete={this.removeAccount.bind(this)} />}
                 {this.state.ShowNewAccountUI && <NewAccount OnSubmit={this.addNewAccount.bind(this)} />}
                 {this.state.ShowModifyAccountUI && <ModifyAccount Account={this.state.AccountToBeModified} OnSubmit={this.modifyAccount.bind(this)} />}
             </div>);
     }
}
